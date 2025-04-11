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

// get total expense by category
export const getTotalExpenseByCategory = asyncHandler(async (req, res) => {
    const { id } = req.user;
    validateMongoDbId(id);
    try {
        const totalExpenseByCategory = await Expense.aggregate([
            {
                $match: { userId: id },
            },
            {
                $group: {
                    _id: '$category',
                    total: { $sum: '$amount' },
                },
            },
        ]);
        res.json(totalExpenseByCategory);
    } catch (error) {
        throw new Error(error);
    }
});

// get total expense by year
export const getTotalExpenseByYear = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const totalExpenseByYear = await Expense.aggregate([
            { 
                $match: { 
                    userId: id // Convert to ObjectId explicitly
                } 
            },
            {
                $group: {
                    _id: { $year: '$createdAt' },
                    total: { $sum: '$amount' },
                },
            },
            { $sort: { _id: 1 } },
            {
                $project: {
                    year: '$_id',
                    total: 1,
                    _id: 0,
                },
            },
        ]);
        res.json(totalExpenseByYear);
    } catch (error) {
        throw new Error(error.message);
    }
});



// get total expense by month
export const getTotalExpenseByMonth = asyncHandler(async (req, res) => {
    const { id } = req.user;
    validateMongoDbId(id);
    try {
        const totalExpenseByMonth = await Expense.aggregate([
            {
                $match: { userId: id },
            },
            {
                $group: {
                    _id: { $month: '$createdAt' },
                    total: { $sum: '$amount' },
                },
            },
        ]);
        res.json(totalExpenseByMonth);
    } catch (error) {
        throw new Error(error);
    }
});

// get total expense by week
export const getTotalExpenseByWeek = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const totalExpenseByWeek = await Expense.aggregate([
            {
                $match: { userId: id },
            },
            {
                $group: {
                    _id: { $week: '$createdAt' },
                    total: { $sum: '$amount' },
                },
            },
        ]);
        res.json(totalExpenseByWeek);
    } catch (error) {
        throw new Error(error);
    }
});

// get total expense by day
export const getTotalExpenseByDay = asyncHandler(async (req, res) => {
    const { id } = req.user;
    validateMongoDbId(id);
    try {
        const totalExpenseByDay = await Expense.aggregate([
            {
                $match: { userId: id },
            },
            {
                $group: {
                    _id: { $dayOfMonth: '$createdAt' },
                    total: { $sum: '$amount' },
                },
            },
        ]);
        res.json(totalExpenseByDay);
    } catch (error) {
        throw new Error(error);
    }
});

// get total expense by hour
export const getTotalExpenseByHour = asyncHandler(async (req, res) => {
    const { id } = req.user;
    validateMongoDbId(id);
    try {
        const totalExpenseByHour = await Expense.aggregate([
            {
                $match: { userId: id },
            },
            {
                $group: {
                    _id: { $hour: '$createdAt' },
                    total: { $sum: '$amount' },
                },
            },
        ]);
        res.json(totalExpenseByHour);
    } catch (error) {
        throw new Error(error);
    }
});

// get total expense by minute
export const getTotalExpenseByMinute = asyncHandler(async (req, res) => {
    const { id } = req.user;
    validateMongoDbId(id);
    try {
        const totalExpenseByMinute = await Expense.aggregate([
            {
                $match: { userId: id },
            },
            {
                $group: {
                    _id: { $minute: '$createdAt' },
                    total: { $sum: '$amount' },
                },
            },
        ]);
        res.json(totalExpenseByMinute);
    } catch (error) {
        throw new Error(error);
    }
});

