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
      return res.status(404).json({
        success: false,
        message: 'Invalid token!',
        data: {
          code: 404,
          timestamp: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
          path: `/users/register`,
          method: 'POST',
          message: 'The token you requested is not found',
        },
      });
    } else if (!data.studentID) {
      data.name = name;
      data.studentID = studentID;
      data.save();
      res.status(200).json({
        success: true,
        message: 'Register success!',
      });
    } else {
      if (data.studentID !== studentID) {
        const date = new Date();
        res.status(403).json({
          success: false,
          message: 'This token is already being used by other user!',
          data: {
            code: 403,
            timestamp: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
            path: `/users/register`,
            method: 'POST',
            message: 'The token you requested is being used by other user!',
          },
        });
      } else {
        if (data.name !== name) {
          const date = new Date();
          res.status(403).json({
            success: false,
            message: 'Name in this token does not match name in the request!',
            data: {
              code: 403,
              timestamp: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
              path: `/users/register`,
              method: 'POST',
              message: 'Name in your token does not match name in your request!',
            },
          });
        } else {
          res.status(200).json({
            success: true,
            message: 'Already register, Login success!',
          });
        }
      }
      return res.status(403).json({
        success: false,
        message: 'This token is not available!',
        data: {
          code: 403,
          timestamp: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
          path: `/check/${token}`,
          method: 'GET',
          message: 'The token you requested',
        },
      });
    }
  });
});

module.exports = router;
