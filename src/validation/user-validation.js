import Joi from "joi";

const userPhoneValidation = Joi.string().max(12).required();

const userImageValidation = Joi.string().max(300).required();

const editUserValidation = Joi.object({
  username: Joi.string().max(20).required(),
  email: Joi.string().max(200).email(),
  phone: Joi.string().max(12).required(),
});

const userAddressValidation = Joi.object({
  city: Joi.string().max(30).required(),
  street: Joi.string().max(100).required(),
  country: Joi.string().max(30).optional(),
});

export {
  userPhoneValidation,
  userImageValidation,
  editUserValidation,
  userAddressValidation,
};
