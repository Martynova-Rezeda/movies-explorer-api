const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const {
  STATUS_CREATED,
  UNIQUE_ERROR,
  BAD_REQUEST_ERROR_MESSAGE,
  NOT_FOUND_ERROR_MESSAGE, CONFLICT_ERROR_MESSAGE,
} = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = require('../utils/configurations');

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      res.send({ token });
    }).catch(next);
};
const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  // записываем данные в базу
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
  // Возвращаем записанные в базу данные пользователю
    .then((user) => {
      const { _id } = user;
      res.status(STATUS_CREATED).send({
        name, email, _id,
      });
    })
  // если данные не записались, возвращаем ошибку
    .catch((err) => {
      if (err.code === UNIQUE_ERROR) {
        next(new ConflictError(CONFLICT_ERROR_MESSAGE));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST_ERROR_MESSAGE));
      } else { next(err); }
    });
};

const getUser = (req, res, next) => {
  const userId = req.params.userId ? req.params.userId : req.user._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND_ERROR_MESSAGE);
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(BAD_REQUEST_ERROR_MESSAGE));
      } else {
        next(err);
      }
    });
};
const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND_ERROR_MESSAGE);
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.code === UNIQUE_ERROR) {
        next(new ConflictError(CONFLICT_ERROR_MESSAGE));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST_ERROR_MESSAGE));
      } else { next(err); }
    });
};
module.exports = {
  login,
  createUser,
  getUser,
  updateUser,
};
