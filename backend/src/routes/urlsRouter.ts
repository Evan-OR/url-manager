import { Router } from 'express';
import urlsController from '../controllers/urlsController';
import authenticateUser from '../middlewares/authMiddleware';

const urlsRouter = Router();

urlsRouter.get('/', authenticateUser, urlsController.getUrlsByCreatorEmail);

export default urlsRouter;
