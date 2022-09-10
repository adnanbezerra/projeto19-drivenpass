import { WiFi } from "@prisma/client";

export type INewWiFi = Omit<WiFi, "id" | "userId">;