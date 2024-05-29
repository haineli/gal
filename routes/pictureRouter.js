const express = require('express');
const router = express.Router();
const pictureController = require('../controllers/pictureController');

// Получить список всех картин
router.get('/', pictureController.getAllPicture);

// Получить информацию о картине по id
router.get('/:id', pictureController.getPictureById);

// Создать новую картину
router.post('/', pictureController.createPicture);

// Обновить информацию о картине по id
router.put('/:id', pictureController.updatePicture);

// Удалить картину по id
router.delete('/:id', pictureController.deletePicture);

module.exports = router;
