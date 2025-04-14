import asyncHandler from 'express-async-handler';
import { validateMongoDbId } from '../utils/validateMongoDbId.js';
import Expense from '../model/Expense.js';



// create expense
export const createExpense = asyncHandler(async (req, res) => {
    const { id } = req.user;
    validateMongoDbId(id);
    try {
        const newExpense = await Expense.create(req.body);
        // add user id to expense
        newExpense.userId = id;
        await newExpense.save();
        res.json(newExpense);
    } catch (error) {
        throw new Error(error);
    }
});

// get all expenses
export const getAllExpenses = asyncHandler(async (req, res) => {
    const { id } = req.user;
    validateMongoDbId(id);
    try {
        const expenses = await Expense.find({ userId: id });
        res.json(expenses);
    } catch (error) {
        throw new Error(error);
    }
});

// get single expense
export const getSingleExpense = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const expense = await Expense.findById(id);
        res.json(expense);
    } catch (error) {
        throw new Error(error);
    }
});


// update expense
export const updateExpense = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json(updatedExpense);
    } catch (error) {
        throw new Error(error);
    }
});


// delete expense
export const deleteExpense = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deletedExpense = await Expense.findByIdAndDelete(id);
        res.json(deletedExpense);
    } catch (error) {
        throw new Error(error);
    }
});

// Total by Category
export const getTotalExpensesByCategory = asyncHandler(async (req, res) => {
    const userId = req.user._id; // Already validated via authMiddleware
    try {
      const result = await Expense.aggregate([
        { $match: { userId } },
        { $group: { _id: "$category", total: { $sum: "$amount" } } }
      ]);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Total by Year 
export const getTotalExpensesByYear = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    try {
      const result = await Expense.aggregate([
        { $match: { userId } },
        { $group: { _id: { $year: "$date" }, total: { $sum: "$amount" } } },
        { $project: { year: "$_id", total: 1, _id: 0 } }
      ]);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


// Total by Month

export const getTotalExpensesByMonth = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;
        const now = new Date();
        const year = req.body.year ? parseInt(req.body.year) : now.getFullYear();
        const month = req.body.month ? parseInt(req.body.month) : (now.getMonth() + 1); // 1-12
        
        const startOfMonth = new Date(year, month - 1, 1);
        const endOfMonth = new Date(year, month, 1); // next month
        
        const result = await Expense.aggregate([
          { 
            $match: { 
              userId: userId,
              date: { $gte: startOfMonth, $lt: endOfMonth }
            } 
          },
          { 
            $group: { 
              _id: null, 
              totalExpenses: { $sum: "$amount" } 
            } 
          }
        ]);
        const total = result.length > 0 ? result[0].totalExpenses : 0;
        return res.json({ year: year, month: month, totalExpenses: total });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error while calculating monthly total' });
      }
});



// Helper function to get the Monday of a given ISO week of a year
function getMondayOfWeek(week, year) {
    // January 4th is always in week 1 (ISO week date rule)
    const january4 = new Date(year, 0, 4);
    // Day of week for Jan 4 (0 = Sunday, 1 = Monday, ... 6 = Saturday)
    const jan4Day = january4.getDay() || 7;  // treat Sunday (0) as 7 for ISO
    // Calculate Monday of week 1 of the ISO year
    const mondayWeek1 = new Date(year, 0, 4 - (jan4Day - 1));
    // Calculate Monday of the target week by adding (week-1)*7 days to week1's Monday
    const mondayOfTargetWeek = new Date(mondayWeek1);
    mondayOfTargetWeek.setDate(mondayWeek1.getDate() + (week - 1) * 7);
    // Normalize to midnight (start of day)
    mondayOfTargetWeek.setHours(0, 0, 0, 0);
    return mondayOfTargetWeek;
  }

  // get total week
export const getTotalExpensesByWeek = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;
        const today = new Date();
        // Determine target year and week (default to current ISO week)
        let targetYear = req.query.year ? parseInt(req.query.year) : today.getFullYear();
        let targetWeek;
        if (req.query.week) {
          targetWeek = parseInt(req.query.week);
        } else {
          // Compute current ISO week number if not provided
          // (We use the helper function by finding current week's Monday relative to week1)
          const startOfCurrentYear = getMondayOfWeek(1, today.getFullYear());
          const diffInMs = today.getTime() - startOfCurrentYear.getTime();
          const diffInDays = Math.floor(diffInMs / (24 * 60 * 60 * 1000));
          targetWeek = Math.floor(diffInDays / 7) + 1;
          // Adjust the targetYear if the current week belongs to the previous/next ISO year
          const endOfCurrentYearWeek52 = getMondayOfWeek(52, today.getFullYear());
          const endOfCurrentYearWeek53 = getMondayOfWeek(53, today.getFullYear());
          // If today's ISO week computed is beyond 52 and week 53 of current year starts next year, adjust year
          if (targetWeek > 52 && endOfCurrentYearWeek52.getFullYear() !== today.getFullYear()) {
            targetYear = today.getFullYear() + 1;
            targetWeek = 1;
          }
          // If it's week 0 (before week 1 of the year), adjust to last week of previous year
          if (targetWeek === 0) {
            targetYear = today.getFullYear() - 1;
            // Recompute the ISO week for the last week of previous year
            const lastWeekDate = getMondayOfWeek(1, today.getFullYear()); // Monday of week1 current year
            lastWeekDate.setDate(lastWeekDate.getDate() - 1);             // go to last day of previous year
            // Use ISO week of that date for previous year
            const endPrevYear = lastWeekDate.getFullYear();
            // Roughly compute last ISO week of previous year (52 or 53)
            targetWeek = Math.floor(((lastWeekDate - getMondayOfWeek(1, endPrevYear)) / (7 * 24 * 3600 * 1000))) + 1;
            targetYear = endPrevYear;
          }
        }
        // Calculate date range for the target week
        const weekStart = getMondayOfWeek(targetWeek, targetYear);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 7);  // next week's Monday (exclusive end)
        
        const result = await Expense.aggregate([
          { 
            $match: { 
              userId: userId,
              date: { $gte: weekStart, $lt: weekEnd }
            } 
          },
          { 
            $group: { 
              _id: null, 
              totalExpenses: { $sum: "$amount" } 
            } 
          }
        ]);
        const total = result.length > 0 ? result[0].totalExpenses : 0;
        return res.json({ year: targetYear, week: targetWeek, totalExpenses: total });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error while calculating weekly total' });
      }
})