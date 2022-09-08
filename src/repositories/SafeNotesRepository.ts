import { SafeNotes } from "@prisma/client";
import { client } from "../database/prisma";

type NewSafeNote = Omit<SafeNotes, "id">;

export async function createNewSafeNote(newCard: NewSafeNote) {
    await client.safeNotes.create({ data: newCard });
}

export async function getSafeNotes() {
    return client.safeNotes.findMany();
}

export async function getSafeNotesById(id: number) {
    return client.safeNotes.findFirst({ where: { id } })
}

export async function deleteSafeNotesById(id: number) {
    return client.safeNotes.delete({ where: { id } })
}