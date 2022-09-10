import { Router } from "express";
import { deleteCard, getCard, postCard } from "../controllers/CardsController.js";
import { validateSchema } from "../middlewares/ValidateSchema.js";
import { ValidateToken } from "../middlewares/ValidateToken.js";
import { CardSchema } from "../schemas/CardSchema.js";
export var CardsRouter = Router();
CardsRouter.post('/card', validateSchema(CardSchema), ValidateToken, postCard);
CardsRouter.get('/cards', ValidateToken, getCard);
CardsRouter["delete"]('/card/:id', ValidateToken, deleteCard);
