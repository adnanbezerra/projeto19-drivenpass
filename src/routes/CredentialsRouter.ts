import { Router } from "express";
import { deleteCredential, getCredential, postCredential } from "../controllers/CredentialController.js";
import { validateSchema } from "../middlewares/ValidateSchema.js";
import { ValidateToken } from "../middlewares/ValidateToken.js";
import { CredentialSchema } from "../schemas/CredentialSchema.js";

export const CredentialsRouter = Router();

CredentialsRouter.post('/credential', validateSchema(CredentialSchema), ValidateToken, postCredential);
CredentialsRouter.get('/credentials', ValidateToken, getCredential);
CredentialsRouter.delete('/credential/:id', ValidateToken, deleteCredential);