require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const routes = require('./routes');
const { MONGO_DB, PORT } = require('./utils/configurations');
const centralError = require('./midlewares/centralError');
const { requestLogger, errorLogger } = require('./midlewares/logger');

const limiter = require('./midlewares/rateLimit');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

mongoose.connect(MONGO_DB);
app.use(requestLogger);
app.use(limiter);
app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(centralError);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
