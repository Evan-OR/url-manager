import { Router } from 'express';
import userController from '../controllers/userController';

const userRouter = Router();

userRouter.post('/create', userController.createUser);

userRouter.get('/:id', userController.getUserById);

export default userRouter;
