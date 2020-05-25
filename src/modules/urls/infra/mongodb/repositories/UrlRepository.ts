import { BASE_URL } from '@shared/utils/env';
import IUrlRepository from '@modules/urls/repositories/IUrlRepository';
import UrlSchema from '../schemas/UrlSchema';

class UrlRepository implements IUrlRepository {
  public async create(originalUrl: string): Promise<string> {
    const url = await UrlSchema.findOne({ originalUrl });

    if (url) return BASE_URL + url.shortUrl;

    const shortUrl = Math.random().toString(36).substring(2, 8);
    await UrlSchema.create({ originalUrl, shortUrl });

    return BASE_URL + shortUrl;
  }

  public async findByShortenUrl(shortUrl: string): Promise<string | undefined> {
    const findUrl = await UrlSchema.findOne({ shortUrl });
    const originalUrl = findUrl?.originalUrl;
    return originalUrl;
  }
}

export default UrlRepository;
