import { Users } from "@prisma/client";
import { Request, Response } from "express";
import { createNewWiFiEntry, deleteWiFiService, getWiFisService } from "../services/WiFiServices.js";
import { INewWiFi } from "../types/WiFiTypes.js";

export async function postWiFi(req: Request, res: Response) {
    const newWiFi: INewWiFi = req.body;
    const user: Users = res.locals.user;

    await createNewWiFiEntry(newWiFi, user);

    return res.sendStatus(201);
}

export async function getWiFis(req: Request, res: Response) {
    const wifiId = Number(req.query.id);
    const user: Users = res.locals.user;

    const wifis = await getWiFisService(user, wifiId);

    return res.status(200).send(wifis);
}

export async function deleteWiFi(req: Request, res: Response) {
    const wifiId = Number(req.params.id);
    const user: Users = res.locals.user;

    await deleteWiFiService(user, wifiId);

    return res.sendStatus(200);
}