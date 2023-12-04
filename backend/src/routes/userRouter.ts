import { Router } from 'express';
import userController from '../controllers/userController';

const userRouter = Router();

userRouter.post('/register', userController.register);

userRouter.post('/login', userController.login);

userRouter.get('/:id', userController.getUserById);

export default userRouter;
