import 'reflect-metadata';
// import faker from 'faker';

import HttpError from '@shared/errors/HttpError';
import FakeUrlRepository from '@modules/urls/repositories/fakes/FakeUrlRepository';
import RedirectToUrlService from './RedirectToUrlService';

interface IResponse {
  redirectToUrlService: RedirectToUrlService;
  fakeUrlRepository: FakeUrlRepository;
}

const makeRedirectToUrlService = (): IResponse => {
  const fakeUrlRepository = new FakeUrlRepository();

  const redirectToUrlService = new RedirectToUrlService(fakeUrlRepository);

  return {
    redirectToUrlService,
    fakeUrlRepository,
  };
};

describe('Redirect to Url Service', () => {
  it('should returns 404 if short url is not found', async () => {
    const { redirectToUrlService } = makeRedirectToUrlService();
    const shortUrl = 'any_shortUrl';

    try {
      await redirectToUrlService.execute(shortUrl);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpError);
      expect(error.status).toBe(404);
      expect(error.message).toBe('Url not found');
    }
  });
});
