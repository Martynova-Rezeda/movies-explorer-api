const router = require('express').Router();
const { getUser, updateUser } = require('../controllers/users');
const celebrate = require('../midlewares/celebrate');

router.get('/me', getUser);
router.patch('/me', celebrate.updateUser, updateUser);

module.exports = router;
