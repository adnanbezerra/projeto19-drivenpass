import { client } from "../database/prisma.js";
import { INewUser } from "../types/UserTypes.js";

export async function createNewUser(userInfo: INewUser) {
    return await client.users.create({ data: userInfo });
}

export async function getUserByEmail(queryEmail: string) {
    return await client.users.findFirst({ where: { email: queryEmail } })
}

export async function getUserById(queryId: number) {
    return await client.users.findFirst({ where: { id: queryId } });
}