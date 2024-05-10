import Joi from "joi"

const userRegisterValidaion = Joi.object({
    email: Joi.string().max(200).required(),
    password: Joi.string().max(10).required(),
    username: Joi.string().max(20).required(),
    phone: Joi.number().max(12).required()
});