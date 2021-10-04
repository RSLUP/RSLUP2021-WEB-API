const express = require('express');

const { userSignUp, userLogin, createUser, getUsers, getUser, updateUser, deleteUser } = require('../controllers/users');

const router = express.Router();

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: User sign up.
 *     description: User sign up.
*/
router.route('/signup').post(userSignUp);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login.
 *     description: User login.
*/
router.route('/login').post(userLogin);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a user.
 *     description: Retrieve a list of users.
*/
router.route('/').post(createUser);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a user.
 *     description: Retrieve a user.
*/
router.route('/:id').get(getUser);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users.
 *     description: Retrieve a list of users.
*/
router.route('/').get(getUsers);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user.
 *     description: Update a user.
*/
router.route('/:id').put(updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user.
 *     description: Delete a user.
*/
router.route('/:id').delete(deleteUser);

module.exports = router;
