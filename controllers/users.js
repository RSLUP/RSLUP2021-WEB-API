const snakeKeys = require('snakecase-keys');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const User = require('../models/User');

// load envs
dotenv.config({ path: './config/config.env' });

let users = [];

// camel case: firstName
// pascal case: FirstName
// snake case: first_name

// --signup POST
exports.userSignUp = async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(10);
        req.body.user_type = "USER";
        req.body.password = await bcrypt.hash(req.body.password, salt);
        const newUser = await User.create({ ...snakeKeys(req.body) });
        res.status(201).json(newUser);
    } catch (error) {
        let errors = [];

        switch (error.name) {
            case 'SequelizeValidationError':
                errors = error.errors.map((e) => e.message);
                return res.status(400).json({ error: errors });
            case 'SequelizeUniqueConstraintError':
                errors = error.errors.map((e) => e.message);
                return res.status(400).json({ error: errors });
        }

        res.status(500).json({ error });
    }
};

// --login POST
exports.userLogin = async (req, res, next) => {
    let errors = [];

    try {
        // Check user exist
        const user = await User.findOne({ where: { email: req.body.email } });
        if (user) {
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                return res.status(401).json({ error: "Invalid Email or Password" });
            }

            // Create and assign token
            const token = jwt.sign({email: user.email, user_type: user.user_type}, process.env.TOKEN_SECRET);
            res.header("auth-token", token).send({
                "first_name": user.first_name,
                "last_name": user.last_name,
                "gender": user.gender,
                "email": user.email,
                "user_type": user.user_type,
                "token": token
            });
            // res.send("Logged IN");
        } else {
            return res.status(401).json({ error: "Invalid Email or Password" });
        }
    } catch (error) {
        switch (error.name) {
            case 'SequelizeValidationError':
                errors = error.errors.map((e) => e.message);
                return res.status(400).json({ error: errors });
            case 'SequelizeUniqueConstraintError':
                errors = error.errors.map((e) => e.message);
                return res.status(400).json({ error: errors });
        }

        res.status(500).json({ error });
    }
};

// --create POST
exports.createUser = async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        const newUser = await User.create({ ...snakeKeys(req.body) });
        res.status(201).json(newUser);
    } catch (error) {
        let errors = [];

        switch (error.name) {
            case 'SequelizeValidationError':
                errors = error.errors.map((e) => e.message);
                return res.status(400).json({ error: errors });
            case 'SequelizeUniqueConstraintError':
                errors = error.errors.map((e) => e.message);
                return res.status(400).json({ error: errors });
        }

        res.status(500).json({ error });
    }
};

// --read GET
exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error });
    }
};

// --read GET
exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.params.id } });

        if (!user) {
            return res.status(404).json({ error: 'Resource Not Found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error });
    }
};

// --update PUT
exports.updateUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { id: req.params.id } });

        if (!user) {
            return res.status(404).json({ error: 'Resource Not Found' });
        }

        await user.update({ ...snakeKeys(req.body) });
        res.status(200).json(user);
    } catch (error) {
        let errors = [];

        switch (error.name) {
            case 'SequelizeValidationError':
                errors = error.errors.map((e) => e.message);
                return res.status(400).json({ error: errors });
            case 'SequelizeUniqueConstraintError':
                errors = error.errors.map((e) => e.message);
                return res.status(400).json({ error: errors });
        }

        res.status(500).json({ error });
    }
};

// --delete DELETE
exports.deleteUser = async (req, res, next) => {
    try {
        const status = await User.destroy({ where: { id: req.params.id } });

        if (!status) {
            return res.status(404).json({ error: 'Resource Not Found' });
        }

        res.status(200).json({ status });
    } catch (error) {
        res.status(500).json({ error });
    }
};
