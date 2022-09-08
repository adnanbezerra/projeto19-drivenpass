import { Credentials } from "@prisma/client";
import { client } from "../database/prisma";

type NewCredential = Omit<Credentials, "id">

export async function createNewCredential(credentialInfo: NewCredential) {
    await client.credentials.create({ data: credentialInfo });
}

export async function getCredentials() {
    return client.credentials.findMany();
}

export async function getCredentialById(id: number) {
    return client.credentials.findFirst({ where: { id } })
}

export async function deleteCredentialById(id: number) {
    return client.credentials.delete({ where: { id } })
}