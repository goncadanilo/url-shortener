import { injectable, inject } from 'tsyringe';

import HttpError from '@shared/errors/HttpError';
import IUrlRepository from '@modules/urls/repositories/IUrlRepository';

@injectable()
class FindShortenUrlService {
  constructor(
    @inject('UrlRepository')
    private readonly urlRepository: IUrlRepository,
  ) {}

  public async execute(shortUrl: string): Promise<string> {
    const url = await this.urlRepository.findByShortenUrl(shortUrl);

    if (!url) throw new HttpError('Url not found', 404);

    return url;
  }
}

export default FindShortenUrlService;
