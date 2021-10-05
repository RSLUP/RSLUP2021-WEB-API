const express = require('express');
const { loggedIn, adminOnly } = require("../helpers/auth.middleware");
const { userSignUp, userLogin, createUser, getUsers, getUser, updateUser, deleteUser } = require('../controllers/users');

const router = express.Router();

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: User sign up.
 *     description: User sign up.
*/
router.post('/signup', userSignUp);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login.
 *     description: User login.
 *     responses:
 *       200:
 *         description: User details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 first_name:
 *                   type: string
 *                   description: User's first name.
 *                   example: Test
 *                 token:
 *                   type: string
 *                   description: Token.
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRpeG9uQHJhbmRvbXNvZnR3YXJlLm5ldCIsInVzZXJfdHlwZSI6IlVTRVIiLCJpYXQiOjE2MzMzNzcwMDF9.x5uqJ6IGm46Vozo02LVECXTpRP8I_B-dAZkaom7ia4U
 */      
router.post('/login', userLogin);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a user.
 *     description: Create a user. Only ADMIN can access this end point.
*/
router.post('/', loggedIn, adminOnly, createUser);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a user.
 *     description: Retrieve a user. Both ADMIN and USER can access this end point. But USER can retrieve his/her own entity only.
*/
router.get('/:id', loggedIn, getUser);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users.
 *     description: Retrieve a list of users. Only ADMIN can access this end point.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: User's id.
 *                     example: 1
 *                   first_name:
 *                     type: string
 *                     description: The user's first name.
 *                     example: Test
 *                   last_name:
 *                      type: string
 *                      description: The user's last name.
 *                      example: User
 */                
router.get('/', loggedIn, adminOnly, getUsers);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user.
 *     description: Update a user. Both ADMIN and USER can access this end point. But USER can update his/her own entity only.
*/
router.put('/:id', loggedIn, updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user.
 *     description: Delete a user. Both ADMIN and USER can access this end point. But USER can delete his/her own entity only.
*/
router.delete('/:id', loggedIn, deleteUser);

module.exports = router;
