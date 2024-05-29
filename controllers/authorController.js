const { Author } = require('../models/models');


/**
 * @swagger
 * tags:
 *   name: Author
 *   description: API для управления авторами книг
 */

/**
 * @swagger
 * /api/author:
 *   get:
 *     summary: Получить список всех авторов
 *     description: Получить список всех авторов из базы данных.
 *     tags: [Author]
 *     responses:
 *       200:
 *         description: Успешный запрос. Список всех авторов.
 */

/**
 * @swagger
 * /api/author/{id}:
 *   get:
 *     summary: Получить информацию об авторе по id
 *     description: Получить информацию об авторе по его id.
 *     tags: [Author]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Идентификатор автора
 *     responses:
 *       200:
 *         description: Успешный запрос. Информация об авторе.
 *       404:
 *         description: Автор не найден.
 */

/**
 * @swagger
 * /api/author:
 *   post:
 *     summary: Создать нового автора
 *     description: Создать нового автора с указанным именем.
 *     tags: [Author]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Успешное создание. Информация о новом авторе.
 */

/**
 * @swagger
 * /api/author/{id}:
 *   put:
 *     summary: Обновить информацию об авторе по id
 *     description: Обновить информацию об авторе по его id.
 *     tags: [Author]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Идентификатор автора
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       200:
 *         description: Успешное обновление. Обновленная информация об авторе.
 *       404:
 *         description: Автор не найден.
 */

/**
 * @swagger
 * /api/author/{id}:
 *   delete:
 *     summary: Удалить автора по id
 *     description: Удалить автора по его id.
 *     tags: [Author]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Идентификатор автора
 *     responses:
 *       200:
 *         description: Успешное удаление. Сообщение об удалении автора.
 *       404:
 *         description: Автор не найден.
 */




// Получить список всех авторов
async function getAllAuthors(req, res, next) {
    try {
        const authors = await Author.findAll();
        res.status(200).json(authors);
    } catch (error) {
        next(error);
    }
}

// Получить информацию об авторе по id
async function getAuthorById(req, res, next) {
    const { id } = req.params;
    try {
        const author = await Author.findByPk(id);
        if (!author) {
            return res.status(404).json({ message: 'Автор не найден' });
        }
        res.status(200).json(author);
    } catch (error) {
        next(error);
    }
}

// Создать нового автора
async function createAuthor(req, res, next) {
    const { name } = req.body;
    try {
        const newAuthor = await Author.create({ name });
        res.status(201).json(newAuthor);
    } catch (error) {
        next(error);
    }
}

// Обновить информацию об авторе по id
async function updateAuthor(req, res, next) {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const author = await Author.findByPk(id);
        if (!author) {
            return res.status(404).json({ message: 'Автор не найден' });
        }
        author.name = name;
        await author.save();
        res.status(200).json(author);
    } catch (error) {
        next(error);
    }
}

// Удалить автора по id
async function deleteAuthor(req, res, next) {
    const { id } = req.params;
    try {
        const author = await Author.findByPk(id);
        if (!author) {
            return res.status(404).json({ message: 'Автор не найден' });
        }
        await author.destroy();
        res.status(200).json({ message: 'Автор успешно удален' });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
};
