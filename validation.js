const Joi = require('joi');

// Register Validation
const registerValidation = data => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  });
  return schema.validate(data);
};

// Login Validation
const loginValidation = data => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  });
  return schema.validate(data);
};

// Logbook Validation
const logbookValidation = data => {
  const schema = Joi.object({
    date: Joi.date().required(),
    activity: Joi.string().required(),
    hours: Joi.number().required()
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.logbookValidation = logbookValidation;
