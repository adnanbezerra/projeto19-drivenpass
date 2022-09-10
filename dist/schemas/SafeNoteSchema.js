import Joi from "joi";
export var SafeNoteSchema = Joi.object({
    title: Joi.string().trim().min(1).max(50).required(),
    note: Joi.string().trim().min(1).max(1000).required()
});
