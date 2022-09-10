import Joi from "joi";
export var CredentialSchema = Joi.object({
    url: Joi.string().uri().required(),
    username: Joi.string().trim().required(),
    password: Joi.string().trim().required(),
    title: Joi.string().trim().required()
});
