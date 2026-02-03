import express from 'express';
import { 
    getUsers,
    postUser,
    getUserById,
    putUserById,
    deleteUser,
    validateType } from '../controllers/users.controller.js';

const usersRouter = express.Router();

usersRouter.get('/', validateType, getUsers);
usersRouter.post('/', validateType, postUser);
usersRouter.get('/:id', getUserById);
usersRouter.put('/:id', validateType, putUserById);
usersRouter.delete('/:id', deleteUser);

export default usersRouter;