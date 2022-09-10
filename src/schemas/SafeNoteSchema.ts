import Joi from "joi";

export const SafeNoteSchema = Joi.object({
    title: Joi.string().trim().required(),
    note: Joi.string().trim().min(1).max(1000).required()
})