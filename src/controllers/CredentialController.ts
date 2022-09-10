import { Users } from "@prisma/client";
import { Request, Response } from "express";
import { createNewCredentialEntry, deleteCredentialService, getCredentialsService } from "../services/CredentialsServices.js";
import { INewcredential } from "../types/CredentialTypes.js";

export async function postCredential(req: Request, res: Response) {
    const newCredential: INewcredential = req.body;
    const user: Users = res.locals.user;

    await createNewCredentialEntry(newCredential, user);

    return res.sendStatus(201);
}

export async function getCredential(req: Request, res: Response) {
    const credentialId = Number(req.query.id);
    const user: Users = res.locals.user;

    const credentials = await getCredentialsService(user, credentialId);

    return res.status(200).send(credentials);
}

export async function deleteCredential(req: Request, res: Response) {
    const credentialId = Number(req.params.id);
    const user: Users = res.locals.user;

    await deleteCredentialService(user, credentialId);

    return res.sendStatus(200);
}