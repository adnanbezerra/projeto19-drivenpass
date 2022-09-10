import { Cards, Users } from "@prisma/client";
import Cryptr from "cryptr";
import { createNewCard, deleteCardById, getCardById, getCards } from "../repositories/CardRepository.js";
import { INewCard } from "../types/CardsTypes.js";
import { checkIfUserHasThisTitle } from "../utils.js";

export async function createNewCardEntry(newCard: INewCard, user: Users) {
    if (await checkIfUserHasThisTitle(user, newCard.title, "card")) throw { type: "user_alreadyHasTitle", message: "You already have a card with this title!" }    

    const cryptr = new Cryptr(process.env.CRYPTR_PASSWORD);
    const encryptedPassword = cryptr.encrypt(newCard.password);

    const newCardInfo = { ...newCard, userId: user.id, password: encryptedPassword };

    await createNewCard(newCardInfo);
}

export async function getCardsService(user: Users, cardId?: number) {
    const cryptr = new Cryptr(process.env.CRYPTR_PASSWORD);

    if (cardId) {
        const card = await getCardById(user.id, cardId);
        const decryptedPassword = cryptr.decrypt(card.password);

        return { ...card, password: decryptedPassword };

    } else {
        const card = await getCards(user.id);

        return decryptCardsPassword(card, cryptr)
    }
}

export async function deleteCardsService(user: Users, cardId: number) {
    await checkIfThisCardIsValid(user, cardId);
    await deleteCardById(cardId);
}

// auxiliary functions

function decryptCardsPassword(cards: Cards[], cryptr: Cryptr): Cards[] {
    const decryptedCards: Cards[] = [];

    for (let card of cards) {
        const decryptedPassword = cryptr.decrypt(card.password);
        decryptedCards.push({ ...card, password: decryptedPassword });
    }

    return decryptedCards;
}

async function checkIfThisCardIsValid(user: Users, cardId: number) {
    const card = await getCardById(user.id, cardId);

    if (!card) throw { type: "error_card_notYours", message: "This card doesn't exist or doesn't belong to you!" };
}