import { Router } from 'express';
import analyticsController from '../controllers/analyticsController';
import authenticateUser from '../middlewares/authMiddleware';
import disableCache from '../middlewares/disableCaching';

const analyticsRouter = Router();

analyticsRouter.get('/:id', authenticateUser, disableCache, analyticsController.getAnalyticsByUrlID);

export default analyticsRouter;
