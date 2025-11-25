import { Request, Response, NextFunction } from "express";
import Ajv from 'ajv';

import { ValidationError } from '../models/errors/validation-error.js';

const ajv = new Ajv({ coerceTypes: true });

export function validateBody(schema: Record<string, any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        const valid = ajv.validate(schema, req.body);

        if (!valid) {
            throw new ValidationError();
        }

        next();
    };
}

export function validateParams(schema: Record<string, any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        const valid = ajv.validate(schema, req.params);

        if (!valid) {
            throw new ValidationError();
        }

        next();
    };
}

export function validateQuery(schema: Record<string, any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        const valid = ajv.validate(schema, req.query);

        if (!valid) {
            throw new ValidationError();
        }

        next();
    };
}