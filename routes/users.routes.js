import express from 'express';
import { 
    getUsers,
    postUser,
    getUserById,
    putUserById } from '../controllers/users.controller.js';

const usersRouter = express.Router();

usersRouter.get('/', getUsers);
usersRouter.post('/', postUser);
usersRouter.get('/:id', getUserById);
usersRouter.put('/:id', putUserById);

export default usersRouter;