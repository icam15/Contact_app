import Joi from "joi";

const contacCreateValidation = Joi.object({
  first_name: Joi.string().max(10).required(),
  last_name: Joi.string().max(10).required(),
  phone: Joi.string().max(12).required(),
});

const contacEditValidation = Joi.object({
  first_name: Joi.string().max(10).optional(),
  last_name: Joi.string().max(10).optional(),
  phone: Joi.string().max(12).optional(),
});

const addContactAddressValidation = Joi.object({
  city: Joi.string().max(30).required(),
  street: Joi.string().max(100).required(),
  country: Joi.string().max(30).optional(),
});

const editContactAddressValidation = Joi.object({
  city: Joi.string().max(30).required(),
  street: Joi.string().max(100).required(),
  country: Joi.string().max(30).required(),
});

export {
  contacCreateValidation,
  contacEditValidation,
  addContactAddressValidation,
  editContactAddressValidation,
};
