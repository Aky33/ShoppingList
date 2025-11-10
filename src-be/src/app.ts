import express, { json } from 'express';
import { connectDB } from './config/mongo-db.js';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 8080;

import shoppingListRoute from './routes/shopping-list-controller.js';
import errorMiddleware from './middlewares/error-middleware.js';

app.use(cors({
   origin: 'http://localhost:5173',
   credentials: true 
}))

//Middleware na parsování json
app.use(json());
app.use('/shopping-list', shoppingListRoute);

app.use(errorMiddleware);

connectDB();

app.listen(port, () => {
    console.log(`Server runs on http://localhost:${port}`);
});