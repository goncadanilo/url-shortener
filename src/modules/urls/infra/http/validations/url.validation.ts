import { celebrate, Segments, Joi } from 'celebrate';
import HttpError from '@shared/errors/HttpError';

export const urlValidation = celebrate({
  [Segments.BODY]: {
    url: Joi.string()
      .uri()
      .error(() => {
        throw new HttpError('Invalid url');
      })
      .required(),
  },
});

export const shortValidation = celebrate({
  [Segments.PARAMS]: {
    shortUrl: Joi.string()
      .length(6)
      .error(() => {
        throw new HttpError('Invalid short url');
      })
      .required(),
  },
});
