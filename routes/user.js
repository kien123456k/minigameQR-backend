const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user');

router.post('/register', user_controller.register);

router.get('/start/:token/:studentID/:name', user_controller.start);

router.post('/end', user_controller.end);

module.exports = router;
