const express = require('express');
const router = express.Router();
const tokenRouter = require('./token');
const userRouter = require('./user');

router.use('/', tokenRouter);
router.use('/user', userRouter);
router.all('/*', function(req, res) {
    res.status(404).send('404 error')
});
module.exports = router;
