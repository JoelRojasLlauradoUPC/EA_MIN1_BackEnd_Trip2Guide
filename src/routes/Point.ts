import express from 'express';
import controller from '../controllers/Point';
import { Schemas, ValidateJoi } from '../middleware/Joi';

const router = express.Router();

/**
 * @openapi
 * tags:
 *   - name: points
 *     description: Endpoints CRUD de Points
 *
 * components:
 *   schemas:
 *     Point:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "65f1c2a1b2c3d4e5f6789999"
 *         name:
 *           type: string
 *           example: "Mirador principal"
 *         description:
 *           type: string
 *           example: "Punto con vistas panorámicas"
 *         latitude:
 *           type: number
 *           example: 41.5932
 *         longitude:
 *           type: number
 *           example: 1.8371
 *         image:
 *           type: string
 *           example: "https://miapp.com/point.jpg"
 *         routeId:
 *           type: string
 *           example: "65f1c2a1b2c3d4e5f6789012"
 *         index:
 *           type: number
 *           example: 0
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2026-03-13T09:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2026-03-13T09:30:00.000Z"
 *
 *     PointCreate:
 *       type: object
 *       required:
 *         - name
 *         - latitude
 *         - longitude
 *         - routeId
 *         - index
 *       properties:
 *         name:
 *           type: string
 *           example: "Mirador principal"
 *         description:
 *           type: string
 *           example: "Punto con vistas panorámicas"
 *         latitude:
 *           type: number
 *           example: 41.5932
 *         longitude:
 *           type: number
 *           example: 1.8371
 *         image:
 *           type: string
 *           example: "https://miapp.com/point.jpg"
 *         routeId:
 *           type: string
 *           example: "65f1c2a1b2c3d4e5f6789012"
 *         index:
 *           type: number
 *           example: 0
 *
 *     PointUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Mirador secundario"
 *         description:
 *           type: string
 *           example: "Otro punto interesante"
 *         latitude:
 *           type: number
 *           example: 41.6001
 *         longitude:
 *           type: number
 *           example: 1.8405
 *         image:
 *           type: string
 *           example: "https://miapp.com/point2.jpg"
 *         routeId:
 *           type: string
 *           example: "65f1c2a1b2c3d4e5f6789012"
 *         index:
 *           type: number
 *           example: 1
 */

/**
 * @openapi
 * /points:
 *   post:
 *     summary: Crea un Point
 *     tags: [points]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PointCreate'
 *     responses:
 *       201:
 *         description: Creado
 *       422:
 *         description: Validación fallida (Joi)
 */
router.post('/', ValidateJoi(Schemas.Point.create), controller.createPoint);

/**
 * @openapi
 * /points/route/{routeId}:
 *   get:
 *     summary: Lista todos los Points de una Route
 *     tags: [points]
 *     parameters:
 *       - in: path
 *         name: routeId
 *         required: true
 *         schema:
 *           type: string
 *         description: ObjectId de la Route
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/route/:routeId', controller.readByRoute);

/**
 * @openapi
 * /points:
 *   get:
 *     summary: Lista todos los Points
 *     tags: [points]
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/', controller.readAll);

/**
 * @openapi
 * /points/{pointId}:
 *   get:
 *     summary: Obtiene un Point por ID
 *     tags: [points]
 *     parameters:
 *       - in: path
 *         name: pointId
 *         required: true
 *         schema:
 *           type: string
 *         description: ObjectId del Point
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: No encontrado
 */
router.get('/:pointId', controller.readPoint);

/**
 * @openapi
 * /points/{pointId}:
 *   put:
 *     summary: Actualiza un Point por ID
 *     tags: [points]
 *     parameters:
 *       - in: path
 *         name: pointId
 *         required: true
 *         schema:
 *           type: string
 *         description: ObjectId del Point
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PointUpdate'
 *     responses:
 *       200:
 *         description: Actualizado
 *       404:
 *         description: No encontrado
 *       422:
 *         description: Validación fallida (Joi)
 */
router.put('/:pointId', ValidateJoi(Schemas.Point.update), controller.updatePoint);

/**
 * @openapi
 * /points/{pointId}:
 *   delete:
 *     summary: Elimina un Point por ID
 *     tags: [points]
 *     parameters:
 *       - in: path
 *         name: pointId
 *         required: true
 *         schema:
 *           type: string
 *         description: ObjectId del Point
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: No encontrado
 */
router.delete('/:pointId', controller.deletePoint);

export default router;