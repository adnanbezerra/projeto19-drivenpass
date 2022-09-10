import { Router } from "express";
import { deleteWiFi, getWiFis, postWiFi } from "../controllers/WiFiController.js";
import { validateSchema } from "../middlewares/ValidateSchema.js";
import { ValidateToken } from "../middlewares/ValidateToken.js";
import { WiFiSchema } from "../schemas/WiFiSchema.js";

export const WiFiRouter = Router();

WiFiRouter.post('/wifi', validateSchema(WiFiSchema), ValidateToken, postWiFi);
WiFiRouter.get('/wifis', ValidateToken, getWiFis);
WiFiRouter.delete('/wifi/:id', ValidateToken, deleteWiFi);