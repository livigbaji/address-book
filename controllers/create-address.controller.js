const joi = require('joi');
const Address = require('../models/address.model');
const countries = require('../data/countries');

module.exports = class {
  // Middleware to check if a country is a valid Alpha2 code
  static async checkCountryValidity(req, res, next) {
    const { country } = req.body;

    if (countries.find(({ alpha2 }) => alpha2 === country)) {
      return next();
    }

    return res.status(422).json({
      error: `Provided country with code '${country}' is invalid, please provide a valid country code`,
    });
  }

  static get createSchema() {
    return joi.object().keys({
      country: joi.string().required(),
      city: joi.string().required(),
      street: joi.string().required(),
      postalcode: joi.string().pattern(new RegExp('^[0-9]{5}$')).required()
        .error(new Error('postalcode string with length of 5 characters and can only contain digits')),
      number: joi.number().positive().required(),
      numberAddition: joi.string().allow(''),
    });
  }

  // Middleware to create address
  // eslint-disable-next-line no-unused-vars
  static async create(req, res, next) {
    const address = await Address.create(req.body);
    return res.set('Location', `http://localhost:4000/address/${address.id}`)
      .status(201).json(
        Address.present(address),
      );
  }
};
