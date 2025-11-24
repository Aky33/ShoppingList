import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config.js";
import { AuthError } from "../models/errors/auth-error.js";

export interface AuthRequest extends Request {
  user?: { id: string };
}

export function auth(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  const token = header?.split(" ")[1];

  if (!token) throw new AuthError;

  jwt.verify(token, config.ACCESS_SECRET, (err, user) => {
    if (err || !user) return res.sendStatus(403);

    req.user = user as { id: string };
    next();
  });
}