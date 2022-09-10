import { Cards } from "@prisma/client";

export type INewCard = Omit<Cards, "id" | "userId">