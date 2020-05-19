import 'reflect-metadata';
import faker from 'faker';

import HttpError from '@shared/errors/HttpError';
import FakeUrlRepository from '@test/fakes/repositories/FakeUrlRepository';
import FindUrlService from './FindUrlService';

interface IResponse {
  findUrlService: FindUrlService;
  fakeUrlRepository: FakeUrlRepository;
}

const makeFindUrlService = (): IResponse => {
  const fakeUrlRepository = new FakeUrlRepository();

  const findUrlService = new FindUrlService(fakeUrlRepository);

  return {
    findUrlService,
    fakeUrlRepository,
  };
};

describe('Redirect to Url Service', () => {
  it('should returns 404 if short url is not found', async () => {
    const { findUrlService } = makeFindUrlService();
    const shortUrl = 'any_shortUrl';

    try {
      await findUrlService.execute(shortUrl);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpError);
      expect(error.status).toBe(404);
      expect(error.message).toBe('Url not found');
    }
  });

  it('should returns original url from the short url', async () => {
    const { findUrlService, fakeUrlRepository } = makeFindUrlService();
    const url = faker.internet.url();
    const shortUrl = await fakeUrlRepository.create(url);
    const response = await findUrlService.execute(shortUrl);

    expect(response).toBe(url);
  });
});
