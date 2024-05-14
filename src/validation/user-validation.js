import Joi from "joi";

const userPhoneValidation = Joi.number().max(12).required();

const userImageValidation = Joi.string().max(300).required();

const editUserValidation = Joi.object({
  username: Joi.string().max(20).required(),
  email: Joi.string().max(200).email().optional(),
  phone: Joi.string().max(12).required(),
});

export { userPhoneValidation, userImageValidation, editUserValidation };
