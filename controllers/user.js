const user = require('../model/user');
const normalQuestion = require('../model/normalQuestion');
const hardQuestion = require('../model/hardQuestion');

const numberHardQuestion = 4;
const numberNormalQuestion = 6;

module.exports = {
  register: (req, res, next) => {
    const token = req.body.token;
    const name = req.body.name;
    const studentID = req.body.studentID;
    user.findOne({token: token}, function (err, student1) {
      if (!student1) {
        const date = new Date();
        res.status(404).json({
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
      } else if (!student1.studentID) {
        user.findOne({studentID: studentID}, (err, student2) => {
          if (student2) {
            const date = new Date();
            res.status(403).json({
              success: false,
              message: 'This studentID has been used!',
              data: {
                code: 403,
                timestamp: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
                path: `/users/register`,
                method: 'POST',
                message: 'Your student ID has been used with other token!',
              },
            });
          } else {
            student1.name = name;
            student1.studentID = studentID;
            student1.save();
            res.status(200).json({
              success: true,
              message: 'Register success!',
            });
          }
        });
      } else {
        if (student1.studentID !== studentID) {
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
          if (student1.name !== name) {
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
    user.findOne({token: token}, function (err, student) {
      if (!student) {
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
        if (student.timeStart) {
          res.status(200).json({
            success: true,
            message: 'Retrieved data successfully!',
            data: user.questions,
          });
        } else {
          let quizs = [];
          const getQuestions = async () => {
            await normalQuestion
              .aggregate()
              .sample(numberNormalQuestion)
              .project('question multipleChoice -_id')
              .exec((err, data) => {
                quizs = quizs.concat(data);
              });
            await hardQuestion
              .aggregate()
              .sample(numberHardQuestion)
              .project('question multipleChoice -_id')
              .exec((err, data) => {
                const date = new Date();
                quizs = quizs.concat(data);
                student.questions = quizs;
                student.timeStart = date.getTime();
                student.save();
                res.status(200).json({
                  success: true,
                  message: 'Retrieved data successfully!',
                  data: quizs,
                });
              });
          };
          getQuestions();
        }
      }
    });
  },
};
