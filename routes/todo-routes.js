const express = require("express");
const router = express.Router();
const Todo = require("../controllers/todo-controller");

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 * tags:
 *   name: Todo
 *   description: Todo managing API
 * /todo:
 *   get:
 *     tags: [Todo]
 *     security:
 *       - bearerAuth: []
 *     description: Get all todo
 *     responses:
 *       200:
 *         description: Success
 *   post:
 *     tags: [Todo]
 *     description: Create todo
 *     parameters:
 *       - in: body
 *         name: todo
 *         description: The todo to create.
 *         type: object
 *         schema:
 *           required:
 *             - title
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             isCompleted:
 *               type: boolean
 *               default: false
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Some server error
 * /todo/{id}:
 *   get:
 *     tags: [Todo]
 *     description: Get todo by id
 *     parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        type: integer
 *     responses:
 *       200:
 *         description: Success
 *   put:
 *     tags: [Todo]
 *     description: Update todo by id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *       - in: body
 *         name: todo
 *         description: The todo to create.
 *         type: object
 *         schema:
 *           required:
 *             - title
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             isCompleted:
 *               type: boolean
 *               default: false
 *     responses:
 *       200:
 *         description: Success
 *   delete:
 *     tags: [Todo]
 *     description: Delete todo by id
 *     parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        type: integer
 *     responses:
 *       200:
 *        description: Success
 */

router.get("/", Todo.getAllTodo);
router.get("/:id", Todo.getTodoById);
router.post("/", Todo.createTodo);
router.put("/:id", Todo.updateTodo);
router.delete("/:id", Todo.deleteTodo);

module.exports = router;
