import Joi from "joi";
export var CardSchema = Joi.object({
    number: Joi.string().trim().required(),
    name: Joi.string().trim().required(),
    CVC: Joi.string().length(3).required(),
    expirationDate: Joi.string().regex(/[0-9]{2}\/[0-9]{2}/).required(),
    type: Joi.string().valid('credit', 'debit', 'both').required(),
    password: Joi.string().trim().required(),
    isVirtual: Joi.boolean().required(),
    title: Joi.string().trim().required()
});
