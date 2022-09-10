import { SafeNotes } from "@prisma/client";
import { client } from "../database/prisma.js";

type NewSafeNote = Omit<SafeNotes, "id">;

export async function createNewSafeNote(newCard: NewSafeNote) {
    await client.safeNotes.create({ data: newCard });
}

export async function getSafeNotes(queryUserId: number) {
    const safeNotes = await client.safeNotes.findMany({ where: { userId: queryUserId } });

    if (!safeNotes.length) throw { type: "error_noSafeNotes", message: "You have no safe notes yet!" };
    return safeNotes;
}

export async function getSafeNotesById(queryUserId: number, safeNoteId: number) {
    const safeNotes = await client.safeNotes.findFirst({ where: { id: safeNoteId, userId: queryUserId } });

    if (!safeNotes) throw { type: "error_invalidSafeNoteId", message: "There's no such safe note id or it isn't yours!" };
    return safeNotes;
}

export async function deleteSafeNotesById(id: number) {
    return client.safeNotes.delete({ where: { id: id } })
}

export async function getSafeNoteByTitleAndUserId(userId: number, title: string) {
    return client.safeNotes.findFirst({ where: { title: title, userId: userId } });
}