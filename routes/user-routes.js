const express = require("express");
const router = express.Router();
const User = require("../controllers/user-controller");

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User managing API
 * /user/register:
 *   post:
 *     tags: [User]
 *     description: Create user
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User to create.
 *         type: object
 *         schema:
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Some server error
 * /user/login:
 *   post:
 *     tags: [User]
 *     description: Login user
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User to create.
 *         type: object
 *         schema:
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Some server error
 * /user/{id}:
 *   delete:
 *     tags: [User]
 *     description: Delete user by id
 *     parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        type: integer
 *     responses:
 *       200:
 *        description: Success
 */

router.post("/login", User.login);
router.post("/register", User.register);
router.delete("/:id", User.deleteUser);

module.exports = router;
