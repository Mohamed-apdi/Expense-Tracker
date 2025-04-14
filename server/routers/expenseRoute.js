import express from 'express';


const expenseRoute = express.Router();

import {
    createExpense,
    deleteExpense,
    getAllExpenses,
    getSingleExpense,
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

export default expenseRoute;