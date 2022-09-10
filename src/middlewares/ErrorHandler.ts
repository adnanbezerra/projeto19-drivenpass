import { NextFunction, Request, Response } from "express"

export default async function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
    if (error.type === "unexpected_error") {
        return res.status(500).send({ message: error.message });
    }
    if (error.type === "error_user_notFound") {
        return res.status(404).send({ message: error.message });
    }
    if (error.type === "error_wrongLogin") {
        return res.status(401).send({ message: error.message });
    }
    if (error.type === "error_user_inUse") {
        return res.status(422).send({ message: error.message });
    }
    if (error.type === "invalid_type") {
        return res.status(500).send({ message: error.message });
    }
    if (error.type === "user_alreadyHasTitle") {
        return res.status(400).send({ message: error.message });
    }
    if (error.type === "error_noCredentials") {
        return res.status(404).send({ message: error.message });
    }
    if (error.type === "error_invalidCredentialId") {
        return res.status(404).send({ message: error.message });
    }
    if (error.type === "error_credential_notYours") {
        return res.status(401).send({ message: error.message });
    }
}