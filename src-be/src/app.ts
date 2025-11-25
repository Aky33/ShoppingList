import express, { json } from 'express';
import { connectDB } from './database/mongo-db.js';
import cors from 'cors';
import cookieParser from "cookie-parser";
const app = express();
const port = process.env.PORT || 8080;

import allowedUserRoute from './routes/allowed-user-route.js';
import authRoute from './routes/auth-route.js';
import listItemRoute from './routes/list-item-route.js';
import shoppingListRoute from './routes/shopping-list-route.js';
import userRoute from './routes/user-route.js';

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
app.use('/allowed-users', allowedUserRoute);
app.use('/auth', authRoute);
app.use('/list-items', listItemRoute);
app.use('/shopping-lists', shoppingListRoute);
app.use('/users', userRoute);

//Error middleware
app.use(errorMiddleware);

//Připojení k db
connectDB();

try {
    app.listen(port, () => console.log(`Server runs on http://localhost:${port}`));
} catch (err) {
    console.error(err);
}
