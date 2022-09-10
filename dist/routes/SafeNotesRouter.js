import { Router } from "express";
import { deleteSafeNote, getSafeNote, postSafeNote } from "../controllers/SafeNotesController.js";
import { validateSchema } from "../middlewares/ValidateSchema.js";
import { ValidateToken } from "../middlewares/ValidateToken.js";
import { SafeNoteSchema } from "../schemas/SafeNoteSchema.js";
export var SafeNotesRouter = Router();
SafeNotesRouter.post('/safeNote', validateSchema(SafeNoteSchema), ValidateToken, postSafeNote);
SafeNotesRouter.get('/safeNotes', ValidateToken, getSafeNote);
SafeNotesRouter["delete"]('/safeNote/:id', ValidateToken, deleteSafeNote);
