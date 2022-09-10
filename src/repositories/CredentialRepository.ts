import { Credentials } from "@prisma/client";
import { client } from "../database/prisma.js";

type NewCredential = Omit<Credentials, "id">

export async function createNewCredential(credentialInfo: NewCredential) {
    await client.credentials.create({ data: credentialInfo });
}

export async function getCredentials(queryUserId: number) {
    const credentials = await client.credentials.findMany({ where: { userId: queryUserId } });

    if (!credentials) throw { type: "error_noCredentials", message: "You have no credentials yet!" };
    return credentials;
}

export async function getCredentialById(queryUserId: number, credentialId: number) {
    const credentials = await client.credentials.findFirst({ where: { id: credentialId, userId: queryUserId } })

    if (!credentials) throw { type: "error_invalidCredentialId", message: "There's no such credential id or it isn't yours!" };
    return credentials;
}

export async function deleteCredentialById(credentialId: number) {
    return client.credentials.delete({ where: { id: credentialId } })
}

export async function getCredentialByTitleAndUserId(userId: number, title: string) {
    return client.credentials.findFirst({ where: { title: title, userId: userId } });
}