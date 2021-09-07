const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// load envs
dotenv.config({ path: './config/config.env' });

exports.db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOSTNAME,
    dialect: process.env.DB_DIALECT,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

exports.connectDB = async () => {
    const conn = await this.db.authenticate();

    console.log(`MySql Connected: ${process.env.DB_HOSTNAME}`.cyan.underline.bold);
};
