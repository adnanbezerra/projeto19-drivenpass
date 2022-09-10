import { Users } from "@prisma/client";
import { Request, Response } from "express";
import { createNewSafeNoteEntry, deleteSafeNotesService, getSafeNotesService } from "../services/SafeNotesServices.js";
import { INewSafeNote } from "../types/SafeNotesTypes.js";

export async function postSafeNote(req: Request, res: Response) {
    const newSafeNote: INewSafeNote = req.body;
    const user: Users = res.locals.user;

    await createNewSafeNoteEntry(newSafeNote, user);

    return res.sendStatus(201);
}

export async function getSafeNote(req: Request, res: Response) {
    const safeNotesId = Number(req.query.id);
    const user: Users = res.locals.user;

    const safeNotes = await getSafeNotesService(user, safeNotesId);

    return res.status(200).send(safeNotes);
}

export async function deleteSafeNote(req: Request, res: Response) {
    const safeNotesId = Number(req.params.id);
    const user: Users = res.locals.user;

    await deleteSafeNotesService(user, safeNotesId);

    return res.sendStatus(200);
}