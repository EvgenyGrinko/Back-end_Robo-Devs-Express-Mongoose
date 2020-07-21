const Joi = require("@hapi/joi");

//Validation on add or edit developer
exports.addEditValidation = (developer) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    // avatar: Joi.string().required()
  });
  return schema.validate(developer);
};

//Validation on register new user
exports.registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

//Validation on login for user
exports.loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};
