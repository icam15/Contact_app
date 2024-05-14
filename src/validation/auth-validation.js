import Joi from "joi";

const userRegisterValidation = Joi.object({
  email: Joi.string().max(200).email().required(),
  password: Joi.string().max(10).required(),
  username: Joi.string().max(20).required(),
});

const userLoginValidation = Joi.object({
  email: Joi.string().max(200).email().required(),
  password: Joi.string().max(10).required(),
});

export { userRegisterValidation, userLoginValidation };
