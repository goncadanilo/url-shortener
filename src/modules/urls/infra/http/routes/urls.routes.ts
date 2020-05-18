import { Router } from 'express';

import UrlController from '../controllers/UrlController';

const routes = Router();
const urlController = new UrlController();

routes.post('/url', urlController.create);

export default routes;
