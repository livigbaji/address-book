const Address = require('../models/address.model');

module.exports = class {
  // eslint-disable-next-line no-unused-vars
  static async get(req, res, next) {
    const address = await Address.findOne({
      _id: req.params.id,
    });

    if (!address) {
      return res.status(404).json({
        error: `Could not find address with id: ${req.params.id}`,
      });
    }

    return res.json(Address.present(address));
  }

  // eslint-disable-next-line no-unused-vars
  static async getAll(req, res, next) {
    return res.json(
      (await Address.find()).map(Address.present),
    );
  }

  // eslint-disable-next-line no-unused-vars
  static async delete(req, res, next) {
    const deletedAddress = await Address.findOneAndRemove({
      _id: req.params.id,
    });

    if (!deletedAddress) {
      return res.status(404).json({
        error: `Could not find address with id: ${req.params.id}`,
      });
    }

    return res.json('');
  }
};
