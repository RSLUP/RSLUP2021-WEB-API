const snakeKeys = require('snakecase-keys');
const User = require('../models/User');

let users = [];

// camel case: firstName
// pascal case: FirstName
// snake case: first_name

// --create POST
exports.createUser = async (req, res, next) => {
    try {
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
