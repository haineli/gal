const Router = require('express');
const router = new Router();
const joinController = require('../controllers/joinController');

router.get('/users/favorite/:authorName', async (req, res, next) => {
  const { authorName } = req.params;
  try {
    const users = await joinController.getUsersWithFavoritePicturesByAuthor(req, res, next);
    res.json(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
