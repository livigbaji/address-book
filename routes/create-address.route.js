const router = require('express').Router();
const $ = require('express-async-handler');
const Validator = require('../middlewares/validator.middleware');
const Controller = require('../controllers/create-address.controller');

router.post('/',
  Validator(Controller.createSchema),
  $(Controller.checkCountryValidity),
  $(Controller.create));

module.exports = router;
