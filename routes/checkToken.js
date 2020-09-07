const express = require('express');
const router = express.Router();
const result = require('../model/result');

router.get('/:token', function (req, res, next) {
  const token = req.params.token;
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
      return res.json({
        success: true,
        isOwn: false,
        message: 'This token is available for use',
      });
    } else {
      return res.json({
        success: true,
        isOwn: true,
        message: 'This token is not available!',
      });
    }
  });
});

module.exports = router;
