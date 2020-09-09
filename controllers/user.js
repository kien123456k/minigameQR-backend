const result = require('../model/result');
const normalQuestion = require('../model/normalQuestion');
const hardQuestion = require('../model/hardQuestion');

const numberHardQuestion = 4;
const numberNormalQuestion = 6;

module.exports = {
  register: (req, res, next) => {
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
      }
    });
  },
  start: (req, res, next) => {
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
            path: `/start/${token}`,
            method: 'GET',
            message: 'The token you requested is not found',
          },
        });
      } else {
        if (data.questions.length) {
          res.status(200).json({
            success: true,
            message: 'Retrieved data successfully!',
            data: data.questions,
          });
        } else {
          const questions = [];
          normalQuestion
            .aggregate()
            .sample(numberNormalQuestion)
            .exec((err, data) => {
              questions.concat(data);
            });
          hardQuestion
            .aggregate()
            .sample(numberHardQuestion)
            .exec((err, data) => {
              questions.concat(data);
            });
          data.questions = questions;
          data.save();
          res.status(200).json({
            success: true,
            message: 'Retrieved data successfully!',
            data: questions,
          });
        }
      }
    });
  },
};
