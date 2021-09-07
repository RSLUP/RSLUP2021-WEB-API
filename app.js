const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');

const { connectDB } = require('./config/db');

// load envs
dotenv.config({ path: './config/config.env' });

// connect to db
connectDB();

const users = require('./router/users');

const app = express();

app.use(express.json());

app.use('/api/v1/users', users);
// mount routes

const PORT = process.env.PORT || 5001;

app.listen(PORT, console.log(`Server running on PORT: ${PORT}`));
