const { Schema, ...mongoose } = require('mongoose');
const addressStatus = require('../data/address-status');

const addressSchema = new Schema({
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  postalcode: {
    type: String,
    required: true,
    match: new RegExp('^[0-9]{5}$'),
  },
  number: {
    type: Number,
    required: true,
    min: 1,
  },
  numberAddition: {
    type: String,
  },
  status: {
    type: String,
    default: null,
    enum: addressStatus.concat([null]),
  },
  name: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    default: null,
  },
}, {
  timestamps: true,
  id: true,
  versionKey: false,
});

addressSchema.loadClass(class {
  static findAndModifyAddress(condition, address) {
    return this.findOneAndUpdate(condition, {
      $set: address,
    }, {
      new: true,
    });
  }

  /**
   * swaps the _id proprty to id for an address
   * @param {*} address
   */
  static present(address) {
    const { _id, ...props } = address.toObject();
    return {
      id: _id,
      ...props,
    };
  }
});

module.exports = mongoose.model('Address', addressSchema);
