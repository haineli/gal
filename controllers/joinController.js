const { User, Favorite, Picture, Author } = require('../models/models');
const ApiError = require('../error/ApiError');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API для управления пользователями и их избранными картинами
 */

/**
 * @swagger
 * /api/users/favorite/{authorName}:
 *   get:
 *     summary: Получить пользователей с избранными картинами по имени автора
 *     description: >
 *       Получает всех пользователей, у которых в избранных картинах есть картины указанного автора.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: authorName
 *         required: true
 *         schema:
 *           type: string
 *         description: Имя автора картины, по которому нужно выполнить поиск.
 *     responses:
 *       200:
 *         description: Успешный запрос. Возвращает массив пользователей.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserWithFavoritePictures'
 *       400:
 *         description: Некорректный запрос или неверный формат имени автора.
 *       500:
 *         description: Внутренняя ошибка сервера при выполнении запроса.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserWithFavoritePictures:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Идентификатор пользователя.
 *         email:
 *           type: string
 *           description: Электронная почта пользователя.
 *         favorites:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: Идентификатор избранного.
 *               picture:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Идентификатор картины.
 *                   title:
 *                     type: string
 *                     description: Название картины.
 *                   author:
 *                     type: string
 *                     description: Автор картины.
 *                   description:
 *                     type: string
 *                     description: Описание картины.
 */

class JoinController {
  async getUsersWithFavoritePicturesByAuthor(req, res, next) {
    const { authorName } = req.params;
    try {
      const users = await User.findAll({
        include: {
          model: Favorite,
          include: {
            model: Picture,
            include: {
              model: Author,
              where: { name: authorName }
            }
          }
        }
      });
      res.json(users);
    } catch (error) {
      next(ApiError.internal('Произошла ошибка при получении пользователей с избранными картинами'));
    }
  }
}

module.exports = new JoinController();