import { createNewUser, getUserByEmail } from "../repositories/UserRepository.js";
import { INewUser } from "../types/UserTypes.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { Users } from "@prisma/client";
dotenv.config();

export async function createNewUserService(newUser: INewUser) {
    await checkNewEmailAvailability(newUser);

    const { password } = newUser;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUserWithHashedPassword = { ...newUser, password: hashedPassword };

    await createNewUser(newUserWithHashedPassword);
}

export async function createNewLoginService(newLogin: INewUser) {
    const SECRET_KEY = process.env.JWT_SECRET;
    const EXPIRATION = process.env.TOKEN_EXPIRES_IN;

    const user = await checkIfUserExists(newLogin);
    verifyLoginPassword(newLogin, user);

    const payload = {
        id: user.id,
        email: user.email
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRATION })
    return token;
}

// auxiliary functions

async function checkNewEmailAvailability(newLogin: INewUser) {
    const user = await getUserByEmail(newLogin.email);

    if (user) throw { type: "error_user_inUse", message: "This e-mail is already in use!" }
}

async function checkIfUserExists(newLogin: INewUser) {
    const user = await getUserByEmail(newLogin.email);

    if (!user) throw { type: "error_wrongLogin", message: "Wrong e-mail or password!" }

    return user;
}

function verifyLoginPassword(newLogin: INewUser, userFromDatabase: Users) {
    const verify = bcrypt.compareSync(newLogin.password, userFromDatabase.password);

    if (!verify) throw { type: "error_wrongLogin", message: "Wrong e-mail or password!" }
}