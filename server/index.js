import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { errorHandler, notFound } from './middlewares/errorHandler.js';
import userRoute from './routers/authRoute.js';
import expenseRoute from './routers/expenseRoute.js';
import connectionDB from './config/dbConnection.js';


const app = express();
const PORT = process.env.PORT || 3000;
connectionDB();

app.use(cors({ origin: 'http://localhost:4200', credentials: true }));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use("/api/user", userRoute);
app.use("/api/expense", expenseRoute);

// errors handler middleware
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})