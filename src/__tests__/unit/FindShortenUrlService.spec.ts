import 'reflect-metadata';
import faker from 'faker';

import HttpError from '@shared/errors/HttpError';
import FindByShortenUrlService from '@modules/urls/services/FindByShortenUrlService';
import FakeUrlRepository from '../fakes/repositories/FakeUrlRepository';

interface IResponse {
  findByShortenUrlService: FindByShortenUrlService;
  fakeUrlRepository: FakeUrlRepository;
}

const makeFindByShortenUrlService = (): IResponse => {
  const fakeUrlRepository = new FakeUrlRepository();

  const findByShortenUrlService = new FindByShortenUrlService(
    fakeUrlRepository,
  );

  return {
    findByShortenUrlService,
    fakeUrlRepository,
  };
};

describe('Redirect to Url Service', () => {
  it('should returns 404 if short url is not found', async () => {
    const { findByShortenUrlService } = makeFindByShortenUrlService();
    const shortUrl = 'any_shortUrl';

    try {
      await findByShortenUrlService.execute(shortUrl);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpError);
      expect(error.statusCode).toBe(404);
      expect(error.message).toBe('Url not found');
    }
  });

  it('should returns original url from the short url', async () => {
    const {
      findByShortenUrlService,
      fakeUrlRepository,
    } = makeFindByShortenUrlService();
    const url = faker.internet.url();
    const shortUrl = await fakeUrlRepository.create(url);
    const response = await findByShortenUrlService.execute(shortUrl);

    expect(response).toBe(url);
  });
});
