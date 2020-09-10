const result = require('../model/result');

module.exports = {
  check: (req, res, next) => {
    const token = req.params.token;
    result.findOne({token: token}, function (err, user) {
      if (!user) {
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
      } else if (!user.name) {
        res.status(200).json({
          success: true,
          available: true,
          message: 'This token is available for use',
        });
      } else {
        res.status(200).json({
          success: true,
          available: false,
          message: 'This token is not available',
        });
      }
    });
  },
};
