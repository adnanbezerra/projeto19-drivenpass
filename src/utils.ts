import { Users } from "@prisma/client";
import { getCardByTitleAndUserId } from "./repositories/CardRepository.js";
import { getCredentialByTitleAndUserId } from "./repositories/CredentialRepository.js";
import { getSafeNoteByTitleAndUserId } from "./repositories/SafeNotesRepository.js";
import { getWiFiByTitleAndUserId } from "./repositories/WiFiRepository.js";

export async function checkIfUserHasThisTitle(user: Users, title: string, type: string) {
    const entry = await getTitle(user.id, title, type);
    
    if(entry) return true;
    else return false;
}

async function getTitle(userId: number, title: string, type: string) {
    if (type === "safeNote") return await getSafeNoteByTitleAndUserId(userId, title);
    else if (type === "credential") return await getCredentialByTitleAndUserId(userId, title);
    else if (type === "card") return await getCardByTitleAndUserId(userId, title);
    else if (type === "wifi") return await getWiFiByTitleAndUserId(userId, title);

    else throw { type: "invalid_type", message: "Something wrong didn't go quite right" }
}