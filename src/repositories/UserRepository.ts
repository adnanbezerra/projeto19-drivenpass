import { Users } from "@prisma/client";
import { client } from "../database/prisma";

type NewUser = Omit<Users, "id">

export async function createNewUser(userInfo: NewUser) {
    const { email, password } = userInfo;

    await client.users.create({
        data: {
            email,
            password
        }
    });
}