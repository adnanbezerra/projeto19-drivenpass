import { SafeNotes } from "@prisma/client";

export type INewSafeNote = Omit<SafeNotes, "id" | "userId">