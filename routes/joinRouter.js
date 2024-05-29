const Router = require('express');
const router = new Router();
const joinController = require('../controllers/joinController');

router.get('/favorite-pictures/:authorName', async (req, res, next) => {
  const { authorName } = req.params;
  try {
    const users = await joinController.getUsersWithFavoritePicturesByAuthor(authorName);
    res.json(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router;