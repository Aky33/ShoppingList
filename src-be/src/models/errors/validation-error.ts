import { HttpError } from "./http-error.js";

export class ValidationError extends HttpError {
    constructor(message = 'Wrong input parameters!') {
        super(400, message);
        this.name = 'ValidationError';
    }
}