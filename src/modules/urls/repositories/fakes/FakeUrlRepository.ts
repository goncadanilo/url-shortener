import IUrlRepository from '../IUrlRepository';

interface IUrls {
  originalUrl: string;
  shortUrl: string;
}

class FakeUrlRepository implements IUrlRepository {
  private urls: IUrls[] = [];

  public async create(): Promise<string> {
    return Math.random().toString(36).substring(2, 8);
  }

  public async findByShortUrl(shortUrl: string): Promise<string | undefined> {
    const findUrl = this.urls.find(url => url.shortUrl === shortUrl);
    const originalUrl = findUrl?.originalUrl;
    return originalUrl;
  }
}

export default FakeUrlRepository;
