import { Credentials, Users } from "@prisma/client";
import { createNewCredential, deleteCredentialById, getCredentialById, getCredentialByTitleAndUserId, getCredentials } from "../repositories/CredentialRepository.js";
import { INewcredential } from "../types/CredentialTypes.js";
import { checkIfUserHasThisTitle } from "../utils.js";
import Cryptr from 'cryptr';
import dotenv from 'dotenv';
dotenv.config();

export async function createNewCredentialEntry(newCredential: INewcredential, user: Users) {
    if (await checkIfUserHasThisTitle(user, newCredential.title, "credential")) throw { type: "user_alreadyHasTitle", message: "You already have a card with this title!" }

    const cryptr = new Cryptr(process.env.CRYPTR_PASSWORD);
    const encryptedPassword = cryptr.encrypt(newCredential.password);

    const newCredentialInfo = { ...newCredential, userId: user.id, password: encryptedPassword };

    await createNewCredential(newCredentialInfo);
}

export async function getCredentialsService(user: Users, credentialId?: number) {
    const cryptr = new Cryptr(process.env.CRYPTR_PASSWORD);

    if (credentialId) {
        const credential = await getCredentialById(user.id, credentialId);
        const decryptedPassword = cryptr.decrypt(credential.password);

        return { ...credential, password: decryptedPassword };

    } else {
        const credential = await getCredentials(user.id);

        return decryptCredentialsPassword(credential, cryptr)
    }
}

export async function deleteCredentialService(user: Users, credentialId: number) {
    await checkIfThisCredentialIsValid(user, credentialId);
    await deleteCredentialById(credentialId);
}

// auxiliary functions

function decryptCredentialsPassword(credentials: Credentials[], cryptr: Cryptr): Credentials[] {
    const decryptedCredentials: Credentials[] = [];

    for (let credential of credentials) {
        const decryptedPassword = cryptr.decrypt(credential.password);
        decryptedCredentials.push({ ...credential, password: decryptedPassword });
    }

    return decryptedCredentials;
}

async function checkIfThisCredentialIsValid(user: Users, credentialId: number) {
    const credential = await getCredentialById(user.id, credentialId);

    if (!credential) throw { type: "error_credential_notYours", message: "This credential doesn't exist or doesn't belong to you!" };
}