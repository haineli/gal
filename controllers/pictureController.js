//pictureController.js
const { Picture } = require('../models/models');

/**
 * @swagger
 * tags:
 *   name: Picture
 *   description: API для управления картинами
 */

/**
 * @swagger
 * /api/picture:
 *   get:
 *     summary: Получить список всех книг
 *     description: Возвращает список всех книг из базы данных.
 *     tags: [Picture]
 *     responses:
 *       200:
 *         description: Список всех книг возвращен успешно.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Picture'
 */

/**
 * @swagger
 * /api/picture/{id}:
 *   get:
 *     summary: Получить картину по ID
 *     description: Возвращает детали картины по заданному ID.
 *     tags: [Picture]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID картины
 *     responses:
 *       200:
 *         description: Картина найдена и возвращена.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Picture'
 *       404:
 *         description: Картина не найдена.
 */

/**
 * @swagger
 * /api/picture:
 *   post:
 *     summary: Создать новую картину
 *     description: Создает новую картину с предоставленными деталями.
 *     tags: [Picture]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Picture'
 *     responses:
 *       201:
 *         description: Картина успешно создана.
 *       400:
 *         description: Неверный запрос, данные не обработаны.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Picture:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         id:
 *           type: integer
 *           description: Идентификатор картины.
 *         title:
 *           type: string
 *           description: Название картины.
 *         author:
 *           type: string
 *           description: Автор картины.
 *         description:
 *           type: string
 *           description: Описание картины.
 */


/**
 * @swagger
 * /api/picture/{id}:
 *   put:
 *     summary: Обновить картину по ID
 *     description: Обновляет детали существующей картины по заданному ID.
 *     tags: [Picture]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID картины
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Picture'
 *     responses:
 *       200:
 *         description: Данные картины обновлены успешно.
 *       404:
 *         description: Картина не найдена.
 */

/**
 * @swagger
 * /api/picture/{id}:
 *   delete:
 *     summary: Удалить картину по ID
 *     description: Удаляет картину по заданному ID.
 *     tags: [Picture]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID картины
 *     responses:
 *       200:
 *         description: Картина успешно удалена.
 *       404:
 *         description: Картина не найдена.
 */


// Получить список всех книг
async function getAllPicture(req, res, next) {
    try {
        const pictur = await Picture.findAll();
        res.status(200).json(pictur);
    } catch (error) {
        next(error);
    }
}

// Получить информацию о книге по id
async function getPictureById(req, res, next) {
    const { id } = req.params;
    try {
        const picture = await Picture.findByPk(id);
        if (!picture) {
            return res.status(404).json({ message: 'Картина не найдена' });
        }
        res.status(200).json(picture);
    } catch (error) {
        next(error);
    }
}

// Создать новую картину
async function createPicture(req, res, next) {
    const { title, author, description } = req.body;
    try {
        const newpicture = await Picture.create({ title, author, description });
        res.status(201).json(newpicture);
    } catch (error) {
        next(error);
    }
}

// Обновить информацию о книге по id
async function updatePicture(req, res, next) {
    const { id } = req.params;
    const { title, author, description } = req.body;
    try {
        const picture = await Picture.findByPk(id);
        if (!picture) {
            return res.status(404).json({ message: 'Картина не найдена' });
        }
        picture.title = title;
        picture.author = author;
        picture.description = description;
        await picture.save();
        res.status(200).json(picture);
    } catch (error) {
        next(error);
    }
}

// Удалить картину по id
async function deletePicture(req, res, next) {
    const { id } = req.params;
    try {
        const picture = await Picture.findByPk(id);
        if (!picture) {
            return res.status(404).json({ message: 'Картина не найдена' });
        }
        await picture.destroy();
        res.status(200).json({ message: 'Картина успешно удалена' });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllPicture,
    getPictureById,
    createPicture,
    updatePicture,
    deletePicture
};
