import { Router } from 'express';
import urlController from '../controllers/urlController';
import authenticateUser from '../middlewares/authMiddleware';

const urlRouter = Router();

urlRouter.post('/shorten', urlController.shortenURL);

urlRouter.get('/:code', urlController.getUrlByCode);
urlRouter.delete('/:code', authenticateUser, urlController.deleteURL);
urlRouter.patch('/:code', authenticateUser, urlController.updateUrl);

export default urlRouter;
