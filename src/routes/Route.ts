import express from 'express';
import controller from '../controllers/Route';
import { Schemas, ValidateJoi } from '../middleware/Joi';

const router = express.Router();

/**
 * @openapi
 * tags:
 *   - name: routes
 *     description: Endpoints CRUD de Routes
 *
 * components:
 *   schemas:
 *     Route:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "65f1c2a1b2c3d4e5f6789012"
 *         title:
 *           type: string
 *           example: "Ruta por Montserrat"
 *         description:
 *           type: string
 *           example: "Ruta circular con vistas muy buenas"
 *         city:
 *           type: string
 *           example: "Barcelona"
 *         country:
 *           type: string
 *           example: "España"
 *         distance:
 *           type: number
 *           example: 12.5
 *         duration:
 *           type: number
 *           example: 180
 *         difficulty:
 *           type: string
 *           example: "medium"
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           example: ["montaña", "naturaleza"]
 *         image:
 *           type: string
 *           example: "https://miapp.com/montserrat.jpg"
 *         authorId:
 *           type: string
 *           example: "65f1c2a1b2c3d4e5f6789001"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2026-03-13T09:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2026-03-13T09:30:00.000Z"
 *
 *     routeCreate:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - city
 *         - country
 *         - distance
 *         - duration
 *         - difficulty
 *         - authorId
 *       properties:
 *         title:
 *           type: string
 *           example: "Ruta por Montserrat"
 *         description:
 *           type: string
 *           example: "Ruta circular con vistas muy buenas"
 *         city:
 *           type: string
 *           example: "Barcelona"
 *         country:
 *           type: string
 *           example: "España"
 *         distance:
 *           type: number
 *           example: 12.5
 *         duration:
 *           type: number
 *           example: 180
 *         difficulty:
 *           type: string
 *           enum: [easy, medium, hard]
 *           example: "medium"
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           example: ["montaña", "naturaleza"]
 *         image:
 *           type: string
 *           example: "https://miapp.com/montserrat.jpg"
 *         authorId:
 *           type: string
 *           example: "65f1c2a1b2c3d4e5f6789001"
 *
 *     routeUpdate:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: "Ruta por Montserrat"
 *         description:
 *           type: string
 *           example: "Ruta circular con vistas muy buenas"
 *         city:
 *           type: string
 *           example: "Barcelona"
 *         country:
 *           type: string
 *           example: "España"
 *         distance:
 *           type: number
 *           example: 12.5
 *         duration:
 *           type: number
 *           example: 180
 *         difficulty:
 *           type: string
 *           enum: [easy, medium, hard]
 *           example: "hard"
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           example: ["montaña", "naturaleza"]
 *         image:
 *           type: string
 *           example: "https://miapp.com/montserrat.jpg"
 *         authorId:
 *           type: string
 *           example: "65f1c2a1b2c3d4e5f6789001"
 */

/**
 * @openapi
 * /routes:
 *   post:
 *     summary: Crea una Route
 *     tags: [routes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RouteCreate'
 *     responses:
 *       201:
 *         description: Creada
 *       422:
 *         description: Validación fallida (Joi)
 */
router.post('/', ValidateJoi(Schemas.Route.create), controller.createRoute);

/**
 * @openapi
 * /routes/{routeId}:
 *   get:
 *     summary: Obtiene una Route por ID
 *     tags: [routes]
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
 *       404:
 *         description: No encontrada
 */
router.get('/:RouteId', controller.readRoute);

/**
 * @openapi
 * /routes:
 *   get:
 *     summary: Lista todas las Routes
 *     tags: [routes]
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/', controller.readAll);

/**
 * @openapi
 * /routes/{routeId}:
 *   put:
 *     summary: Actualiza una Route por ID
 *     tags: [routes]
 *     parameters:
 *       - in: path
 *         name: routeId
 *         required: true
 *         schema:
 *           type: string
 *         description: ObjectId de la Route
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RouteUpdate'
 *     responses:
 *       200:
 *         description: Actualizada
 *       404:
 *         description: No encontrada
 *       422:
 *         description: Validación fallida (Joi)
 */
router.put('/:RouteId', ValidateJoi(Schemas.Route.update), controller.updateRoute);

/**
 * @openapi
 * /routes/{routeId}:
 *   delete:
 *     summary: Elimina una Route por ID
 *     tags: [routes]
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
 *       404:
 *         description: No encontrada
 */
router.delete('/:RouteId', controller.deleteRoute);

export default router;