import express from 'express';


const expenseRoute = express.Router();

import {
    createExpense,
    deleteExpense,
    getAllExpenses,
    getSingleExpense,
    getTotalExpenseByCategory,
    getTotalExpenseByDay,
    getTotalExpenseByMonth,
    getTotalExpenseByWeek,
    getTotalExpenseByYear,
    updateExpense,
} from "../controller/expenseCtrl.js"


import { authMiddleware } from '../middlewares/authMiddleware.js';

// create expense
expenseRoute.post('/', authMiddleware, createExpense);
// get all expenses
expenseRoute.get('/', authMiddleware, getAllExpenses);
// get single expense
expenseRoute.get('/:id', authMiddleware, getSingleExpense);
// update expense
expenseRoute.put('/:id', authMiddleware, updateExpense);
// delete expense
expenseRoute.delete('/:id', authMiddleware, deleteExpense);
// get total expense by category
expenseRoute.get('/total-by-category', authMiddleware, getTotalExpenseByCategory);
// get total yearly expenses
expenseRoute.get('/yearly/:id', authMiddleware, getTotalExpenseByYear);
// get total monthly expenses
expenseRoute.get('/monthly', authMiddleware, getTotalExpenseByMonth);
// get total weekly expenses
expenseRoute.get('/weekly/:id', authMiddleware, getTotalExpenseByWeek);
// get total daily expenses
expenseRoute.get('/daily', authMiddleware, getTotalExpenseByDay);

export default expenseRoute;