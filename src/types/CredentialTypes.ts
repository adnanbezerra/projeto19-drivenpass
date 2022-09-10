import { Credentials } from "@prisma/client";

export type INewcredential = Omit<Credentials, "id" | "userId">;