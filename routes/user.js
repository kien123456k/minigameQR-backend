const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user');

router.post('/register', user_controller.register);

router.get('/start/:token', user_controller.start);

module.exports = router;
