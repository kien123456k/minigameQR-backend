const express = require('express');
const router = express.Router();
const token_controller = require('../controllers/token');

router.get('/check/:token', token_controller.check);
// router.get('/test/:token', token_controller.test);

module.exports = router;
