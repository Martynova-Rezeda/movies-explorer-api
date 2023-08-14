const { INTERNAL_SERVER_ERROR } = require('../utils/constants');

const centralError = (err, req, res, next) => {
  if (!err.statusCode) {
    res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
  }
  res.status(err.statusCode).send({ message: err.message });
  next();
};
module.exports = centralError;
