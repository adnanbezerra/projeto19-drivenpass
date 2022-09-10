import { WiFi } from "@prisma/client";
import { client } from "../database/prisma.js";

type NewWiFi = Omit<WiFi, "id">;

export async function createNewWiFi(newCard: NewWiFi) {
    await client.wiFi.create({ data: newCard });
}

export async function getWiFi(queryUserId: number) {
    const wifis = await client.wiFi.findMany({ where: { userId: queryUserId } });

    if (!wifis.length) throw { type: "error_noWiFis", message: "You have no WiFis yet!" };
    return wifis;
}

export async function getWiFiById(queryUserId: number, wifiId: number) {
    const wifi = await client.wiFi.findFirst({ where: { id: wifiId, userId: queryUserId } })

    if (!wifi) throw { type: "error_invalidWiFiId", message: "There's no such WiFi id or it isn't yours!" };
    return wifi;
}

export async function deleteWiFiById(id: number) {
    return client.wiFi.delete({ where: { id: id } })
}

export async function getWiFiByTitleAndUserId(userId: number, title: string) {
    return client.wiFi.findFirst({ where: { title: title, userId: userId } });
}