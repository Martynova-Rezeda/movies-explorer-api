require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const routes = require('./routes');
const centralError = require('./midlewares/centralError');
const { requestLogger, errorLogger } = require('./midlewares/logger');
const auth = require('./midlewares/auth');
const NotFoundError = require('./errors/NotFoundError');
const limiter = require('./midlewares/rateLimit');

const { PORT = 3000 } = process.env;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

mongoose.connect('mongodb://127.0.0.1:27017/moviesdb');
app.use(requestLogger);
app.use(limiter);
app.use(routes);
app.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});
app.use(errorLogger);
app.use(errors());
app.use(centralError);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
