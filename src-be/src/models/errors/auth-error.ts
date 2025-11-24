import { HttpError } from "./http-error.js";

export class AuthError extends HttpError {
    constructor(message = 'Unknown user!') {
        super(401, message);
        this.name = 'AuthError';
    }
}