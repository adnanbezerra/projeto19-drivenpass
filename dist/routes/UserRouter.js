import { Router } from "express";
import { postSignin, postSignup } from "../controllers/UserController.js";
import { validateSchema } from "../middlewares/ValidateSchema.js";
import { UserSchema } from "../schemas/UserSchema.js";
export var UserRouter = Router();
UserRouter.post('/signup', validateSchema(UserSchema), postSignup);
UserRouter.post('/signin', validateSchema(UserSchema), postSignin);
