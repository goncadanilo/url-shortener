import { Router } from 'express';

import UrlController from '../controllers/UrlController';
import { urlValidation, shortValidation } from '../validations/url.validation';

const routes = Router();
const urlController = new UrlController();

routes.post('/url', urlValidation, urlController.create);
routes.get('/:shortUrl', shortValidation, urlController.getUrl);

export default routes;
