var express = require('express');
var router = express.Router();
const homeCtrl = require('../controllers/index');

//GET request to /
router.get('/', homeCtrl.index);

module.exports = router;
