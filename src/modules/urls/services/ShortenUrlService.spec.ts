import 'reflect-metadata';
import faker from 'faker';

import HttpError from '@shared/errors/HttpError';
import FakeUrlRepository from '@modules/urls/repositories/fakes/FakeUrlRepository';
import FakeUrlValidation from '@modules/urls/providers/UrlValidation/fakes/FakeUrlValidation';
import ShortenUrlService from './ShortenUrlService';

interface IResponse {
  shortenUrlService: ShortenUrlService;
  fakeUrlRepository: FakeUrlRepository;
  fakeUrlValidation: FakeUrlValidation;
}

const makeShortenUrlService = (): IResponse => {
  const fakeUrlRepository = new FakeUrlRepository();
  const fakeUrlValidation = new FakeUrlValidation();

  const shortenUrlService = new ShortenUrlService(
    fakeUrlRepository,
    fakeUrlValidation,
  );

  return {
    shortenUrlService,
    fakeUrlValidation,
    fakeUrlRepository,
  };
};

describe('Shorten Url Service', () => {
  it('should be able to create a new url shortcut', async () => {
    const { shortenUrlService, fakeUrlRepository } = makeShortenUrlService();
    const url = faker.internet.url();
    const { status, newUrl } = await shortenUrlService.execute(url);

    expect(status).toBe(201);
    expect(newUrl).toHaveLength(6);
    expect(await fakeUrlRepository.findByShortUrl(newUrl)).toBe(url);
  });

  it('should returns 400 if an invalid url is provided', async () => {
    const { shortenUrlService, fakeUrlValidation } = makeShortenUrlService();
    const url = 'any_url';

    fakeUrlValidation.fakeResponse(false);

    try {
      await shortenUrlService.execute(url);
    } catch (error) {
      expect(error).toBeInstanceOf(HttpError);
      expect(error.status).toBe(400);
      expect(error.message).toBe('Invalid url');
    }
  });
});
