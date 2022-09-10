import { Cards } from "@prisma/client";
import { client } from "../database/prisma.js";

type NewCard = Omit<Cards, "id">;

export async function createNewCard(newCard: NewCard) {    
    return client.cards.create({ data: newCard });
}

export async function getCards(queryUserId: number) {
    const cards = await client.cards.findMany({ where: { userId: queryUserId } });
    if (!cards.length) throw { type: "error_noCards", message: "You have no cards yet!" };
    return cards;
}

export async function getCardById(queryUserId: number, id: number) {
    const cards = await client.cards.findFirst({ where: { id: id, userId: queryUserId } });
    if (!cards) throw { type: "error_invalidCardId", message: "There's no such cards id or it isn't yours!" };
    return cards;
}

export async function deleteCardById(id: number) {
    return client.cards.delete({ where: { id: id } })
}

export async function getCardByTitleAndUserId(userId: number, title: string) {
    return client.cards.findFirst({ where: { title: title, userId: userId } });
}