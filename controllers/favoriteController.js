const { Favorite, Book } = require('../models/models');

/**
 * @swagger
 * tags:
 *   name: Favorite
 *   description: API для работы с избранными книгами пользователей
 */

/**
 * @swagger
 * /api/favorite/add:
 *   post:
 *     summary: Добавление книги в список избранных пользователя
 *     description: Добавляет указанную книгу в список избранных для заданного пользователя.
 *     tags: [Favorite]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               bookId:
 *                 type: integer
 *             required:
 *               - userId
 *               - bookId
 *     responses:
 *       201:
 *         description: Успешное добавление книги в список избранных.
 *       400:
 *         description: Книга уже добавлена в избранное или некорректные данные запроса.
 *       404:
 *         description: Книга не найдена.
 *       500:
 *         description: Ошибка сервера.
 */

/**
 * @swagger
 * /api/favorite/remove:
 *   delete:
 *     summary: Удаление книги из списка избранных пользователя
 *     description: Удаляет указанную книгу из списка избранных для заданного пользователя.
 *     tags: [Favorite]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               bookId:
 *                 type: integer
 *             required:
 *               - userId
 *               - bookId
 *     responses:
 *       200:
 *         description: Книга успешно удалена из списка избранных.
 *       404:
 *         description: Книга не найдена в списке избранных.
 *       500:
 *         description: Ошибка сервера.
 */

class FavoritesController {
    async addToFavorites(req, res, next) {
        try {
            const { userId, bookId } = req.body;

            const book = await Book.findByPk(bookId);
            if (!book) {
                return res.status(404).json({ message: "Книга не найдена" });
            }

            const existingFavorite = await Favorite.findOne({ where: { userId, bookId } });

            if (existingFavorite) {
                return res.status(400).json({ message: "Книга уже добавлена в избранное" });
            }

            const newFavorite = await Favorite.create({ userId, bookId });

            return res.status(201).json(newFavorite);
        } catch (error) {
            next(error);
        }
    }

    async removeFromFavorites(req, res, next) {
        try {
            const { userId, bookId } = req.body;

            const favorite = await Favorite.findOne({ where: { userId, bookId } });

            if (!favorite) {
                return res.status(404).json({ message: "Книга не найдена в списке избранных" });
            }

            await favorite.destroy();

            return res.status(200).json({ message: "Книга успешно удалена из избранного" });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new FavoritesController();
