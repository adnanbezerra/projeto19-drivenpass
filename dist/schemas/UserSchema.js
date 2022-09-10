import Joi from 'joi';
export var UserSchema = Joi.object({
    email: Joi.string().trim().required(),
    password: Joi.string().trim().required()
});
