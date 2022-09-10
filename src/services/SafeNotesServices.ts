import dotenv from 'dotenv';
import { createNewSafeNote, deleteSafeNotesById, getSafeNotes, getSafeNotesById } from '../repositories/SafeNotesRepository.js';
import { INewSafeNote } from '../types/SafeNotesTypes.js';
import { Users } from '@prisma/client';
import { checkIfUserHasThisTitle } from '../utils.js';
dotenv.config();

export async function createNewSafeNoteEntry(newSafeNote: INewSafeNote, user: Users) {
    if (await checkIfUserHasThisTitle(user, newSafeNote.title, "safeNote")) throw { type: "user_alreadyHasTitle", message: "You already have a card with this title!" }

    const newSafeNoteInfo = { ...newSafeNote, userId: user.id };

    await createNewSafeNote(newSafeNoteInfo);
}

export async function getSafeNotesService(user: Users, safeNoteId?: number) {
    if (safeNoteId) {
        return await getSafeNotesById(user.id, safeNoteId);
    } else {
        return await getSafeNotes(user.id);
    }
}

export async function deleteSafeNotesService(user: Users, safeNoteId: number) {
    await checkIfThisSafeNoteIsValid(user, safeNoteId);
    await deleteSafeNotesById(safeNoteId);
}

// auxiliary functions

async function checkIfThisSafeNoteIsValid(user: Users, safeNoteId: number) {
    const safeNote = await getSafeNotesById(user.id, safeNoteId);

    if (!safeNote) throw { type: "error_safeNote_notYours", message: "This safe note doesn't exist or doesn't belong to you!" };
}