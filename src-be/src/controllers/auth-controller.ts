import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";

import { config } from "../config.js";
import { ValidationError } from "../models/errors/validation-error.js";

import userService from "../services/user-service.js";
import { User } from "../models/user.js";

//Generování tokenů
function generateAccessToken(userId: string) {
  return jwt.sign({ id: userId }, config.ACCESS_SECRET, { expiresIn: "15m" });
}

function generateRefreshToken(userId: string) {
  return jwt.sign({ id: userId }, config.REFRESH_SECRET, { expiresIn: "7d" });
}

class AuthController {
    async register(req: any, res: any, next: any) {
        try {
            const { login, password } = req.body;
            const model = new User({ login, password });

            await userService.insert(model);
            res.json(model._id);
        } catch (err) {
            next(err);
        }
    }

    async login(req: any, res: any, next: any) {
        try {
            const { login, password } = req.body;

            const user = await userService.get(null, login);
            if (!user) throw new ValidationError("Invalid credentials");

            const match = await user.checkPassword(password);
            if (!match) throw new ValidationError("Invalid credentials");

            const accessToken = generateAccessToken(user._id as string);
            const refreshToken = generateRefreshToken(user._id as string);

            // httpOnly cookie
            res.cookie("refreshToken", refreshToken, {
              httpOnly: true,
              secure: true,
              sameSite: "strict",
              path: "/auth/refresh"
            });

            res.json({ accessToken });
        } catch (err) {
            next(err);
        }
    }

    async refresh(req: any, res: any, next: any) {
        try {
            const token = req.cookies.refreshToken;
            if (!token) throw new ValidationError("Neexistuje validní refresh token");

            jwt.verify(token, config.REFRESH_SECRET, (error: VerifyErrors | null, decoded?: Object | undefined) => {
                if (error || !decoded) throw new ValidationError("Nepodařilo se ověřit token");

                const payload = decoded as JwtPayload;
                const accessToken = generateAccessToken(payload.id);

                res.json({ accessToken });
            });
        } catch (err) {
            next(err);
        }
    }

    async logout(req: any, res: any, next: any) {
        try {
            res.clearCookie("refreshToken", { path: "/auth/refresh" });
            res.json({ message: "Logged out" });
        } catch (err) {
            next(err);
        }
    }
}   

export default new AuthController()