import faker from 'faker';

import IUrlRepository from '../repositories/interfaces/IUrlRepository';
import ShortenUrlService from './ShortenUrlService';

class FakeUrlRepository implements IUrlRepository {
  public async create(): Promise<string> {
    return Math.random().toString(36).substring(2, 8);
  }
}

describe('Shorten Url Service', () => {
  it('should be able to create a new url shortcut', async () => {
    const fakeUrlRepository = new FakeUrlRepository();
    const shortenUrlService = new ShortenUrlService(fakeUrlRepository);
    const url = faker.internet.url();
    const { status, newUrl } = await shortenUrlService.execute(url);

    expect(status).toBe(201);
    expect(newUrl).toHaveLength(6);
  });
});
