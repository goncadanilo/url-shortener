import IUrlRepository from '@modules/urls/repositories/IUrlRepository';
import UrlSchema from '../schemas/UrlSchema';

class UrlRepository implements IUrlRepository {
  public async create(originalUrl: string): Promise<string> {
    const url = await UrlSchema.findOne({ originalUrl });

    if (url) return url.shortUrl;

    const shortUrl = Math.random().toString(36).substring(2, 8);
    await UrlSchema.create({ originalUrl, shortUrl });

    return process.env.BASE_URL + shortUrl;
  }
}

export default UrlRepository;