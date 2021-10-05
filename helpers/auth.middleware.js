const dotenv = require('dotenv');
const jwt = require("jsonwebtoken");
const User = require('../models/User');

// load envs
dotenv.config({ path: './config/config.env' });

exports.loggedIn = async function (req, res, next) {
    let token = req.header('Authorization');
    if (!token) return res.status(401).send("No Token");

    try {
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length).trimLeft();
        }
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);

        // Check user exist
        const user = await User.findOne({ where: { email: verified.email, user_type: verified.user_type} });
        if (user) {
            if (user.user_type === "USER" ) { // Check authorization
                let req_url = req.baseUrl + req.route.path;
                // User cannot change user_type his/her self
                req.body.user_type = "USER";
                if (req_url.includes("users/:id") && parseInt(req.params.id) !== user.id){
                    return res.status(403).send("Forbidden");
                }
            }
        } else {
            return res.status(401).send("Invalid Token");
        }

        req.user = verified;
        next();
    }
    catch (error) {
        switch (error.name) {
            case 'SequelizeValidationError':
                errors = error.errors.map((e) => e.message);
                return res.status(400).json({ error: errors });
            case 'SequelizeUniqueConstraintError':
                errors = error.errors.map((e) => e.message);
                return res.status(400).json({ error: errors });
        }

        res.status(401).send("Invalid Token");
    }
}

exports.adminOnly = async function (req, res, next) {
    if (req.user.user_type !== "ADMIN") {
        return res.status(403).send("Forbidden");
    }  
    next();
}