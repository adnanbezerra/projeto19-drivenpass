import Joi from 'joi';

export const UserSchema = Joi.object({
    email: Joi.string().trim().required(),
    password: Joi.string().trim().required()
})