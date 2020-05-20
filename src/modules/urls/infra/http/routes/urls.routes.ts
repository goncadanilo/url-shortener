import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UrlController from '../controllers/UrlController';

const routes = Router();
const urlController = new UrlController();

routes.post(
  '/url',
  celebrate({
    [Segments.BODY]: { url: Joi.string().uri().required() },
  }),
  urlController.create,
);

routes.get(
  '/:shortUrl',
  celebrate({
    [Segments.PARAMS]: { shortUrl: Joi.string().length(6).required() },
  }),
  urlController.getUrl,
);

export default routes;
