import { createUser } from "../repositories/users.repository.js";
import { createDataObject } from "../utilities/createDataObject.js";
import passport from "passport";

export const validateType = (req, res, next) => {
    if (req.body) {
        for (const [key, value] of Object.entries(req.body)) {
            if (typeof value !== 'string') {
                return res.status(400).send(`Bad request: value for ${key} must be of type 'string'.`);
            }
        }
    }
    if (!req.body) {
        return res.status(400).send(`Bad request: username and password required.`);
    }
    next();
}

export const registerUser = async (req, res) => {
    let data = await createDataObject(req.body);
    for (const [key, value] of Object.entries(data)) {
        if (!value) {
            return res.status(403).send(`Unable to register an user without a value for ${key}.`)
        }
    }
    try {
        const user = await createUser(data);
        res.status(201).send(`User ${user.id} registered successfully`);
    } catch (error) {
        res.status(500).json({ error: "Failed to create user" });
    }
}

export const loginUser = [
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth/fail'
    })
];

export const logoutUser = (req, res, next) => {
    req.logout(function(err) {
        if (err) {return next(err)};
        res.redirect('/');
    });
};
