const express = require('express');
const router = express.Router();
const result = require('../model/result');

router.post('/register', function (req, res, next) {
  const token = req.body.token;
  const name = req.body.name;
  const studentID = req.body.studentID;
  result.findOne({token: token}, function (err, data) {
    if (!data) {
      const date = new Date();
      return res.json({
        success: false,
        message: 'Invalid token!',
        data: {
          code: 404,
          timestamp: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
          path: `/check/${token}`,
          method: 'GET',
          message: 'The token you requested is not found',
        },
      });
    } else if (!data.name) {
      data.name = name;
      data.studentID = studentID;
      data.save();
      res.json({
        success: true,
        message: 'Register success!',
      });
    } else {
      return res.json({
        success: false,
        message: 'This token is not available!',
      });
    };
  });
});

module.exports = router;
