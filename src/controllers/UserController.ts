import { Request, Response } from "express";
import { createNewLoginService, createNewUserService } from "../services/UserServices.js";
import { INewUser } from "../types/UserTypes.js";

export async function postSignup(req: Request, res: Response) { 
    const newUser: INewUser = req.body;

    await createNewUserService(newUser);

    return res.sendStatus(201);
}

export async function postSignin(req: Request, res: Response) {
    const newLogin: INewUser = req.body;

    const token = await createNewLoginService(newLogin);

    return res.status(200).send(token);
}