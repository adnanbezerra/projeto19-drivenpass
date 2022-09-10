import { Users } from "@prisma/client";
import { Request, Response } from "express";
import { createNewCardEntry, deleteCardsService, getCardsService } from "../services/CardsServices.js";
import { INewCard } from "../types/CardsTypes.js";

export async function postCard(req: Request, res: Response) {
    const newCard: INewCard = req.body;
    const user: Users = res.locals.user;

    await createNewCardEntry(newCard, user);

    return res.sendStatus(201);
}

export async function getCard(req: Request, res: Response) {
    const cardId = Number(req.query.id);
    const user: Users = res.locals.user;

    const cards = await getCardsService(user, cardId);

    return res.status(200).send(cards);
}

export async function deleteCard(req: Request, res: Response) {
    const cardId = Number(req.params.id);
    const user: Users = res.locals.user;

    await deleteCardsService(user, cardId);

    return res.sendStatus(200);
}