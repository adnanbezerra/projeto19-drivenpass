import Joi from "joi";

export const WiFiSchema = Joi.object({
    title: Joi.string().trim().required(),
    password: Joi.string().trim().required(),
    name: Joi.string().trim().required()
})