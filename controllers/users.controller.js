import {
    findUsers,
    createUser,
    findUserById,
    updateUserById,
    deleteUserById } from '../repositories/users.repository.js';
import { createDataObject } from '../utilities/createDataObject.js';

export const validateType = (req, res, next) => {
    if (req.body) {
        for (const [key, value] of Object.entries(req.body)) {
            if (typeof value !== 'string') {
                return res.status(400).send(`Bad request: value for ${key} must be type 'string'.`);
            }
        }
    }
    if (req.query) {
        for (const key of Object.keys(req.query)) {
            if (key !== 'username' && key !== 'first_name' && key !== 'last_name') {
                return res.status(400).send(`Bad request in query: "${key}". No such key in users.`);
            }
        }
    }
    next();
}

export const getUsers = (async (req, res) => {
    let queryData = req.query;
    if (Object.entries(queryData).length === 0) {
        try {
            const users = await findUsers(queryData);
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch users" });
        }
    }
    if (Object.entries(queryData).length > 0) {
        try {
            const users = await findUsers(queryData);
            if (Object.keys(users).length > 0) {
                res.status(200).json(users);
            } else {
                res.status(404).send(`Unable to find users matching your query.`)
            }
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch users" });
        }
    }
});


export const postUser = (async (req, res) => {
    let data = createDataObject(req.body);
    try {
        const user = await createUser(data);
        res.status(201).send(`User ${user.id} created successfully`);
    } catch (error) {
        res.status(500).json({ error: "Failed to create user" });
    }
})

export const getUserById = (async (req, res) => {
    let id = parseInt(req.params.id);
    try {
        const user = await findUserById(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send(`User with id ${id} not found!`);
        }
    } catch (error) {
        res.status(500).json({ error: `Failed to request user.`});
    }
})

export const putUserById = (async (req, res) => {
    let id = parseInt(req.params.id);
    let data = createDataObject(req.body);
    try {
        await updateUserById(id, data);
        res.status(200).send(`USer ${id} updated successfully!`);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user.'})
    }
})

export const deleteUser = (async (req, res) => {
    let id = parseInt(req.params.id);
    try {
        const result = await deleteUserById(id);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).send(`User with id ${id} not found!`);
        }
    } catch (error) {
        res.status(500).json({ error: `Failed to delete user` });
    }
})