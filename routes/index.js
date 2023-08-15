const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const { createUser, login } = require('../controllers/users');
const auth = require('../midlewares/auth');
const celebrate = require('../midlewares/celebrate');
const NotFoundError = require('../errors/NotFoundError');
const { NOT_FOUND_ERROR_MESSAGE } = require('../utils/constants');

router.post('/signin', celebrate.login, login);
router.post('/signup', celebrate.createUser, createUser);

router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);

router.use('*', auth, (req, res, next) => {
  next(new NotFoundError(NOT_FOUND_ERROR_MESSAGE));
});
module.exports = router;
