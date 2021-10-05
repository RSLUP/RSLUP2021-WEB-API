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
