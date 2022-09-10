import { Users, WiFi } from "@prisma/client";
import Cryptr from "cryptr";
import { createNewWiFi, deleteWiFiById, getWiFi, getWiFiById } from "../repositories/WiFiRepository.js";
import { INewWiFi } from "../types/WiFiTypes.js";
import { checkIfUserHasThisTitle } from "../utils.js";

export async function createNewWiFiEntry(newCard: INewWiFi, user: Users) {
    if (await checkIfUserHasThisTitle(user, newCard.title, "wifi")) throw { type: "user_alreadyHasTitle", message: "You already have a card with this title!" }

    const cryptr = new Cryptr(process.env.CRYPTR_PASSWORD);
    const encryptedPassword = cryptr.encrypt(newCard.password);

    const newWiFi = { ...newCard, userId: user.id, password: encryptedPassword };

    await createNewWiFi(newWiFi);
}

export async function getWiFisService(user: Users, wifiId?: number) {
    const cryptr = new Cryptr(process.env.CRYPTR_PASSWORD);

    if (wifiId) {
        const card = await getWiFiById(user.id, wifiId);
        const decryptedPassword = cryptr.decrypt(card.password);

        return { ...card, password: decryptedPassword };

    } else {
        const card = await getWiFi(user.id);

        return decryptCardsPassword(card, cryptr)
    }
}

export async function deleteWiFiService(user: Users, wifiId: number) {
    await checkIfThisCardIsValid(user, wifiId);
    await deleteWiFiById(wifiId);
}

// auxiliary functions

function decryptCardsPassword(wifis: WiFi[], cryptr: Cryptr): WiFi[] {
    const decryptedWiFis: WiFi[] = [];

    for (let wifi of wifis) {
        const decryptedPassword = cryptr.decrypt(wifi.password);
        decryptedWiFis.push({ ...wifi, password: decryptedPassword });
    }

    return decryptedWiFis;
}

async function checkIfThisCardIsValid(user: Users, wifiId: number) {
    const wifi = await getWiFiById(user.id, wifiId);

    if (!wifi) throw { type: "error_wifi_notYours", message: "This WiFi doesn't exist or doesn't belong to you!" };
}