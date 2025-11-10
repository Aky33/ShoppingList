import { Request, Response, NextFunction } from "express";
import { HttpError } from "../models/errors/http-error.js";

export function errorMiddleware(err: unknown, req: Request, res: Response, next: NextFunction) {
    //default
    let status = 500;
    let message = 'Internal server error';
    
    if (err instanceof HttpError) {
        status = err.status;
        message = err.message;
    } else if (err instanceof Error) {
        message = err.message;
    }

    console.error('Error: ', err);
    res.status(status).json({ error: { message: message } });
}

export default errorMiddleware;