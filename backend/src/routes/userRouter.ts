import { Router } from 'express';
import userController from '../controllers/userController';
import authenticateUser from '../middlewares/authMiddleware';

const userRouter = Router();

userRouter.post('/register', userController.register);

userRouter.post('/login', userController.login);

userRouter.get('/protected', authenticateUser, userController.protectedRoute);

userRouter.get('/:id', userController.getUserById);

export default userRouter;
