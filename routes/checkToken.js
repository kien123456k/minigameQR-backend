const express = require('express');
const router = express.Router();
const result = require('../model/result');

router.get('/:token', function (req, res, next) {
  const token = req.params.token;
  result.findOne({token: token}, function (err, data) {
    if (!data) {
      const date = new Date();
      res.status(404).json({
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
      res.status(200).json({
        success: true,
        available: true,
        message: 'This token is available for use',
      });
    } else {
      res.status(200).json({
        success: true,
        available: false,
        message: 'This token is not available!',
      });
    }
  });
});

module.exports = router;
