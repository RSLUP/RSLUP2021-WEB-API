const { DataTypes } = require('sequelize');
const { db } = require('../config/db');

const User = db.define('user', {
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlpha: true,
        },
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlpha: true,
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    gender: {
        type: DataTypes.ENUM('MALE', 'FEMALE', 'OTHER'),
        allowNull: false,
        validate: {
            isIn: [['MALE', 'FEMALE', 'OTHER']],
        },
    },
});

User.sync().then(() => {
    console.log(`table created`.purple);
});

module.exports = User;
