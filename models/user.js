const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { AUTH_ERROR_MESSAGE } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Некорректный формат e-mail',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },

});

userSchema.statics.findUserByCredentials = function findUser(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(AUTH_ERROR_MESSAGE));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        // проверяем хеши паролей]
        if (!matched) {
          return Promise.reject(new UnauthorizedError(AUTH_ERROR_MESSAGE));
        }

        return user;
      });
    });
};
module.exports = mongoose.model('user', userSchema);
