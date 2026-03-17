import express from 'express';
import controller from '../controllers/User';
import { Schemas, ValidateJoi } from '../middleware/Joi';

const router = express.Router();

/**
 * @openapi
 * tags:
 *   - name: users
 *     description: Endpoints CRUD de Users
 *
 * components:
 *   schemas:
 *     user:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ObjectId de MongoDB
 *           example: "65f1c2a1b2c3d4e5f6789012"
 *         name:
 *           type: string
 *           example: "Judit"
 *         surname:
 *           type: string
 *           example: "Martinez"
 *         username:
 *           type: string
 *           example: "judit99"
 *         email:
 *           type: string
 *           example: "judit@gmail.com"
 *         password:
 *           type: string
 *           example: "password123"
 *         enabled:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2026-03-07T14:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2026-03-07T15:00:00.000Z"
 *
 *     userCreate:
 *       type: object
 *       required:
 *         - name
 *         - surname
 *         - username
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           example: "Judit"
 *         surname:
 *           type: string
 *           example: "Martinez"
 *         username:
 *           type: string
 *           example: "judit99"
 *         email:
 *           type: string
 *           example: "judit@gmail.com"
 *         password:
 *           type: string
 *           example: "password123"
 *
 *     userUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Judit"
 *         surname:
 *           type: string
 *           example: "Martinez"
 *         username:
 *           type: string
 *           example: "judit99"
 *         email:
 *           type: string
 *           example: "judit@gmail.com"
 *         password:
 *           type: string
 *           example: "password123"
 *         enabled:
 *           type: boolean
 *           example: true
 */

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Crea un User
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreate'
 *     responses:
 *       201:
 *         description: Creado
 *       422:
 *         description: Validación fallida (Joi)
 */
router.post('/', ValidateJoi(Schemas.User.create), controller.createUser);

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Lista todos los Users
 *     tags: [users]
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/', controller.readAll);

/**
 * @openapi
 * /users/{userId}:
 *   get:
 *     summary: Obtiene un User por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ObjectId del User
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: No encontrado
 */
router.get('/:UserId', controller.readUser);

/**
 * @openapi
 * /users/{userId}:
 *   put:
 *     summary: Actualiza un User por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ObjectId del User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: Actualizado
 *       404:
 *         description: No encontrado
 *       422:
 *         description: Validación fallida (Joi)
 */
router.put('/:UserId', ValidateJoi(Schemas.User.update), controller.updateUser);

/**
 * @openapi
 * /users/{userId}:
 *   delete:
 *     summary: Elimina un User por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ObjectId del User
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: No encontrado
 */
router.delete('/:UserId', controller.deleteUser);

export default router;