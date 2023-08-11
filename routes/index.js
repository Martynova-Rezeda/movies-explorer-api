const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const { createUser, login } = require('../controllers/users');
const auth = require('../midlewares/auth');
const celebrate = require('../midlewares/celebrate');

router.post('/signin', celebrate.login, login);
router.post('/signup', celebrate.createUser, createUser);

router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);
module.exports = router;
