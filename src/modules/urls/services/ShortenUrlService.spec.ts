import 'reflect-metadata';
import faker from 'faker';

import FakeUrlRepository from '@test/fakes/repositories/FakeUrlRepository';
import ShortenUrlService from './ShortenUrlService';

interface IResponse {
  shortenUrlService: ShortenUrlService;
  fakeUrlRepository: FakeUrlRepository;
}

const makeShortenUrlService = (): IResponse => {
  const fakeUrlRepository = new FakeUrlRepository();

  const shortenUrlService = new ShortenUrlService(fakeUrlRepository);

  return {
    shortenUrlService,
    fakeUrlRepository,
  };
};

describe('Shorten Url Service', () => {
  it('should be able to create a new url shortcut', async () => {
    const { shortenUrlService, fakeUrlRepository } = makeShortenUrlService();
    const url = faker.internet.url();
    const newUrl = await shortenUrlService.execute(url);

    expect(newUrl).toHaveLength(6);
    expect(await fakeUrlRepository.findByShortUrl(newUrl)).toBe(url);
  });
});
