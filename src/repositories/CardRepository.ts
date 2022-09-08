import { Cards } from "@prisma/client";
import { client } from "../database/prisma";

type NewCard = Omit<Cards, "id">;

export async function createNewCard(newCard: NewCard) {
    await client.cards.create({ data: newCard });
}

export async function getCards() {
    return client.cards.findMany();
}

export async function getCardById(id: number) {
    return client.cards.findFirst({ where: { id } })
}

export async function deleteCardById(id: number) {
    return client.cards.delete({ where: { id } })
}