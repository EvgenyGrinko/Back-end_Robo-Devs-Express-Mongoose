const Joi = require('@hapi/joi');


function ValidationError(developer){
  const schema = Joi.object({
    name: Joi.string().required(),
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    // avatar: Joi.string().required()
  })
  return schema.validate(developer);
}
module.exports = ValidationError;

