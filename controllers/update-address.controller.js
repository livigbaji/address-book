const joi = require('joi');
const Address = require('../models/address.model');
const addressStatus = require('../data/address-status');

module.exports = class {
  // Middleware to check status validity
  static checkStatusValidity(req, res, next) {
    const { status } = req.body;
    if (addressStatus.concat([null]).includes(status)) {
      return next();
    }

    const lastStatus = addressStatus.slice(-1).pop();

    return res.status(422).json({
      error: `status should be any one of: ${addressStatus.join(', ')} or ${lastStatus}`,
    });
  }

  static get updateSchema() {
    return joi.object().keys({
      status: joi.string().allow(null).required(),
      name: joi.string(),
      email: joi.string().email(),
    });
  }

  // Middleware to check if address exists
  static async checkAddressExistence(req, res, next) {
    const addressExists = await Address.exists({
      _id: req.params.id,
    });

    if (addressExists) {
      return next();
    }

    return res.status(404).json({
      error: `Could not find address with id: ${req.params.id}`,
    });
  }

  // eslint-disable-next-line no-unused-vars
  static async update(req, res, next) {
    const updatedAddress = await Address.findAndModifyAddress({
      _id: req.params.id,
      status: { $in: [null, 'not at home'] },
    }, req.body);

    if (!updatedAddress) {
      return res.status(403).json({
        error: 'No further changes is allowed on address if its current status is already \'not interested\' or \'interested\'',
      });
    }

    return res.json(Address.present(updatedAddress));
  }
};
