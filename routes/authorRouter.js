const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

// Получить список всех авторов
router.get('/', authorController.getAllAuthors);

// Получить информацию об авторе по id
router.get('/:id', authorController.getAuthorById);

// Создать нового автора
router.post('/', authorController.createAuthor);

// Обновить информацию об авторе по id
router.put('/:id', authorController.updateAuthor);

// Удалить автора по id
router.delete('/:id', authorController.deleteAuthor);

module.exports = router;
