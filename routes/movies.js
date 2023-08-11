const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const celebrate = require('../midlewares/celebrate');

router.get('/', getMovies);
router.post('/', celebrate.createMovie, createMovie);
router.delete('/:_id', celebrate.checkMovieId, deleteMovie);
module.exports = router;
