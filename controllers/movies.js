const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const {
  STATUS_CREATED, NOT_FOUND_ERROR_MESSAGE, BAD_REQUEST_ERROR_MESSAGE, FORBIDDEN_ERROR_MESSAGE,
} = require('../utils/constants');

const getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  // записываем данные в базу
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
  // Возвращаем записанные в базу данные пользователю
    .then((movie) => res.status(STATUS_CREATED).send(movie))
  // если данные не записались, возвращаем ошибку
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(BAD_REQUEST_ERROR_MESSAGE));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(NOT_FOUND_ERROR_MESSAGE);
      } else if (movie.owner.equals(req.user._id)) {
        return Movie.findByIdAndRemove(req.params._id)
          .then((deletedMovie) => res.send(deletedMovie));
      } else {
        throw new ForbiddenError(FORBIDDEN_ERROR_MESSAGE);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(BAD_REQUEST_ERROR_MESSAGE));
        return;
      }
      next(err);
    });
};

module.exports = { getMovies, createMovie, deleteMovie };
