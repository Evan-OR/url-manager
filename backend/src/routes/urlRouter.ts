import { Router } from 'express';
import urlController from '../controllers/urlController';

const urlRouter = Router();

urlRouter.post('/shorten', urlController.shortenURL);

urlRouter.get('/:code', urlController.getUrlByCode);
urlRouter.delete('/:code', urlController.deleteURL);

export default urlRouter;
