const authController = require('express').Router();
const { body, validationResult } = require('express-validator');

const { register, login, logout } = require('../services/userService');
const { parseError } = require('../util/parser');
const { userModel, tokenBlacklistModel } = require('../models')
const utils = require('../utils')
const { authCookieName } = require('../app-config')
const bsonToJson = (data) => { return JSON.parse(JSON.stringify(data)) };
const removePassword = (data) => {
    const { password, __v, ...userData } = data;
    return userData
}
const path = require('path')

authController.post('/register',
    async (req, res, next) => {
        const { email, password, img } = req.body;

        return userModel.create({ email, password, img })
            .then((createdUser) => {
                createdUser = bsonToJson(createdUser);
                createdUser = removePassword(createdUser);

                const token = utils.jwt.createToken({ id: createdUser._id });

                if (process.env.NODE_ENV === 'production') {
                    res.cookie(token)
                } else {
                    res.cookie(token)
                }
                res.status(200)
                    .send(createdUser);
            })
            .catch(err => {
                if (err.name === 'MongoError' && err.code === 11000) {
                    let field = err.message.split("index: ")[1];
                    field = field.split(" dup key")[0];
                    field = field.substring(0, field.lastIndexOf("_"));

                    res.status(409)
                        .send({ message: `This ${field} is already registered!` });
                    return;
                }
                next(err);
            });
    });

authController.post('/login', async (req, res, next) => {
    const { email, password } = req.body;

    userModel.findOne({ email })
        .then(user => {
            return Promise.all([user, user ? user.matchPassword(password) : false]);
        })
        .then(([user, match]) => {
            if (!match) {
                res.status(401)
                    .send({ message: 'Wrong email or password' });
                return
            }
            user = bsonToJson(user);
            user = removePassword(user);

            const token = utils.jwt.createToken({ id: user._id });

            if (process.env.NODE_ENV === 'production') {
                res.cookie(token)
            } else {
                res.cookie(token)
            }
            res.status(200)
                .send(user);
        })
        .catch(next);
});

authController.get('/logout', async (req, res) => {
    const token = req.cookies[cookie];

    tokenBlacklistModel.create({ token })
        .then(() => {
            res.clearCookie(token)
                .status(204)
                .send({ message: 'Logged out!' });
        })
        .catch(err => res.send(err));
});

module.exports = authController;