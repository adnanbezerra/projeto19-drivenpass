import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { getUserById } from '../repositories/UserRepository.js';
import { NextFunction, Request, Response } from 'express';
dotenv.config();

export async function ValidateToken(req: Request, res: Response, next: NextFunction) {
    try {
        const { authorization } = req.headers;
        const token = authorization?.replace("Bearer ", "");

        if (!token) {
            return res.sendStatus(401);
        }

        const data: any = jwt.verify(token, process.env.JWT_SECRET);

        if (data) {
            const user = await getUserById(data.id);
            res.locals.user = user;
            next();
        } else {
            return res.status(401).send("Erro ao validar o usuário");
        }

    } catch (error) {
        return res.sendStatus(401);
    }
}