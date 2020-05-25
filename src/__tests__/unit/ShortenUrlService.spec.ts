import 'reflect-metadata';
import faker from 'faker';

import ShortenUrlService from '@modules/urls/services/ShortenUrlService';
import FakeUrlRepository from '../fakes/repositories/FakeUrlRepository';

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
  it('should be able to create a new shorten url', async () => {
    const { shortenUrlService, fakeUrlRepository } = makeShortenUrlService();
    const url = faker.internet.url();
    const newUrl = await shortenUrlService.execute(url);

    expect(newUrl).toHaveLength(6);
    expect(await fakeUrlRepository.findByShortenUrl(newUrl)).toBe(url);
  });
});
