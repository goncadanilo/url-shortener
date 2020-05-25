import IUrlRepository from '@modules/urls/repositories/IUrlRepository';

interface IUrls {
  originalUrl: string;
  shortUrl: string;
}

class FakeUrlRepository implements IUrlRepository {
  private urls: IUrls[] = [];

  public async create(originalUrl: string): Promise<string> {
    const shortUrl = Math.random().toString(36).substring(2, 8);
    this.urls.push({ originalUrl, shortUrl });
    return shortUrl;
  }

  public async findByShortenUrl(shortUrl: string): Promise<string | undefined> {
    const findUrl = this.urls.find(url => url.shortUrl === shortUrl);
    const originalUrl = findUrl?.originalUrl;
    return originalUrl;
  }
}

export default FakeUrlRepository;
