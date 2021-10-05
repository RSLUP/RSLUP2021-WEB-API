const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { connectDB } = require('./config/db');

// load envs
dotenv.config({ path: './config/config.env' });

// connect to db
connectDB();

const users = require('./router/users');

const app = express();

app.use(express.json());

app.use(cors());

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "RSLUP 2021 WEB API",
        version: "1.0.0",
        description: "RSLUP 2021 WEB API",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
          name: "Random Software Ltd",
          url: "https://randomsoftware.net",
          email: "info@randomsoftware.net",
        },
      },
      servers: [
        {
          url: "http://localhost:3000/api/v1",
        },
      ],
    },
    apis: ["./router/*.js"],
};

const specs = swaggerJsdoc(options);
// documentation route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api/v1/users', users);
// mount routes

const PORT = process.env.PORT || 5001;

app.listen(PORT, console.log(`Server running on PORT: ${PORT}`));
