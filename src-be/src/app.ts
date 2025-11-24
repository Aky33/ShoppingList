import express, { json } from 'express';
import { connectDB } from './database/mongo-db.js';
import cors from 'cors';
import cookieParser from "cookie-parser";
const app = express();
const port = process.env.PORT || 8080;

import authRoute from './routes/auth-route.js';
import shoppingListRoute from './routes/shopping-list-controller.js';
import errorMiddleware from './middlewares/error-middleware.js';

//Cors pro web
app.use(cors({
   origin: 'http://localhost:5173',
   credentials: true 
}))

app.use(cookieParser());

//Middleware na parsování json
app.use(json());

//Routes
app.use('/auth', authRoute);
app.use('/shopping-list', shoppingListRoute);

//Error middleware
app.use(errorMiddleware);

//Připojení k db
connectDB();

app.listen(port, () => {
    console.log(`Server runs on http://localhost:${port}`);
});