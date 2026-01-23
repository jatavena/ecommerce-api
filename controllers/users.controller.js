import findAllUsers from '../repositories/users.repository.js';

const getUsers = (async (req, res) => {
    try {
        const users = await findAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" })
    }
});


export default getUsers;