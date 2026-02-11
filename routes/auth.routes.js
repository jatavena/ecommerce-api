import express from 'express';
import { loginUser, registerUser, logoutUser, validateType } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.get('/login', loginUser);
authRouter.post('/register', validateType, registerUser);
authRouter.get('/logout', logoutUser);

export default authRouter;