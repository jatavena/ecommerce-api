import {
    findAllUsers,
    createUser,
    findUserById,
    updateUserById } from '../repositories/users.repository.js';

export const getUsers = (async (req, res) => {
    try {
        const users = await findAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

export const postUser = (async (req, res) => {
    let data = req.body;
    try {
        await createUser(data);
        res.status(201).send(`User ${data.id} created successfully`);
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
    let data = req.body;
    try {
        console.log(`Trying to update user ${id}`)
        await updateUserById(id, data);
        res.status(200).send(`USer ${id} updated successfully!`);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user.'})
    }
})