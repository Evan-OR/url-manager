import { Router } from 'express';
import redirectController from '../controllers/redirectController';
import disableCache from '../middlewares/disableCaching';

const redirectRouter = Router();

redirectRouter.get('/:code', disableCache, redirectController.redirect);

export default redirectRouter;
