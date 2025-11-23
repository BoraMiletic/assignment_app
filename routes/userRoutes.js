const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const router = express.Router();

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - username
 *               - email
 *               - password
 *               - role
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: First name of the user
 *                 example: Mike
 *               lastName:
 *                 type: string
 *                 description: Last name of the user
 *                 example: Test
 *               username:
 *                 type: string
 *                 description: Unique username
 *                 example: mike
 *               email:
 *                 type: string
 *                 description: Unique email
 *                 example: mike@example.com
 *               password:
 *                 type: string
 *                 description: Password for login
 *                 example: test123
 *               role:
 *                 type: string
 *                 description: Role of the user, either 'basic' or 'admin'
 *                 example: basic
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     firstName:
 *                       type: string
 *                       example: Mike
 *                     lastName:
 *                       type: string
 *                       example: Test
 *                     username:
 *                       type: string
 *                       example: mike
 *                     email:
 *                       type: string
 *                       example: mike@example.com
 *                     role:
 *                       type: string
 *                       example: basic
 *       400:
 *         description: Username or email already exists
 *       500:
 *         description: Internal server error
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login a user and get JWT token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usernameOrEmail
 *               - password
 *             properties:
 *               usernameOrEmail:
 *                 type: string
 *                 description: Username or email of the user
 *                 example: mike
 *               password:
 *                 type: string
 *                 description: User password
 *                 example: test123
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token and user info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                   description: JWT token to be used in Authorization header
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     username:
 *                       type: string
 *                       example: mike
 *                     role:
 *                       type: string
 *                       example: basic
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post('/login', loginUser);

module.exports = router;
