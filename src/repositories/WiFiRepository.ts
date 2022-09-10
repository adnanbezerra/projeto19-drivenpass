import { WiFi } from "@prisma/client";
import { client } from "../database/prisma.js";

type NewWiFi = Omit<WiFi, "id">;

export async function createNewWiFi(newCard: NewWiFi) {
    await client.wiFi.create({ data: newCard });
}

export async function getWiFi() {
    return client.wiFi.findMany();
}

export async function getwiFiById(id: number) {
    return client.wiFi.findFirst({ where: { id: id } })
}

export async function deletewiFiById(id: number) {
    return client.wiFi.delete({ where: { id: id } })
}

export async function getWiFiByTitleAndUserId(userId: number, title: string) {
    return client.wiFi.findFirst({ where: { title: title, userId: userId } });
}