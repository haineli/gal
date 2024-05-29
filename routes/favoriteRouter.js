const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');

router.post('/add', favoriteController.addToFavorites);


router.delete('/remove', favoriteController.removeFromFavorites);

module.exports = router;
