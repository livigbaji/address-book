const joi = require('joi');

/**
 * reducer callback function to turn joi error message into a simple object
 * it takes the label or key property and makes it a key in the accumulatedObject
 * while the value of the key would be the error message
 * @param {Object} accumulatedObject
 * @param {Object} currentError
 */
const reducer = (accumulatedObject, currentError) => Object.assign(accumulatedObject, {
  [currentError.context.label || currentError.context.key]: currentError.message.replace(new RegExp('"', 'ig'), ''),
});

/**
 * takes in a joi validation schema
 * and returns a middleware to run a preconfigued joi validator
 * @param {JoiSchema} schema
 * @returns middleware
 */
module.exports = (schema) => async (req, res, next) => {
  try {
    const value = await joi.attempt(req.body || {}, schema, {
      abortEarly: false,
      convert: true,
      stripUnknown: true,
    });
    req.bodyOld = req.body;
    // refined request body
    req.body = value;
    next();
  } catch (error) {
    // refined error message
    res.status(422).json({
      error: error.message || error.details.reduce(reducer, {}),
    });
  }
};
