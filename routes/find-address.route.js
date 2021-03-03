const router = require('express').Router();
const $ = require('express-async-handler');
const Controller = require('../controllers/find-address.controller');

router.get('/', $(Controller.getAll));

router.route('/:id')
  .get($(Controller.get))
  .delete($(Controller.delete));

module.exports = router;
