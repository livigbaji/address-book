const router = require('express').Router();
const $ = require('express-async-handler');
const Validator = require('../middlewares/validator.middleware');
const Controller = require('../controllers/update-address.controller');

router.patch('/:id',
  Validator(Controller.updateSchema),
  $(Controller.checkStatusValidity),
  $(Controller.checkAddressExistence),
  $(Controller.update));

module.exports = router;
