import { Request, Response, NextFunction } from "express";
import Ajv, { JSONSchemaType } from 'ajv';
import { ValidationError } from '../models/errors/validation-error.js';

const ajv = new Ajv({ coerceTypes: true });

export function validateRequest<T>(schema: JSONSchemaType<T>) {
    return (req: Request, res: Response, next: NextFunction) => {
        const valid = ajv.validate(schema, req.body);

        if (!valid) {
            throw new ValidationError();
        }

        next();
    };
}