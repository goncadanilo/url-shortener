import { injectable, inject } from 'tsyringe';

import HttpError from '@shared/errors/HttpError';
import IUrlRepository from '@modules/urls/repositories/IUrlRepository';

interface IResponse {
  status: number;
  url: string;
}

@injectable()
class RedirectToUrl {
  constructor(
    @inject('UrlRepository')
    private readonly urlRepository: IUrlRepository,
  ) {}

  public async execute(shortUrl: string): Promise<IResponse> {
    const url = await this.urlRepository.findByShortUrl(shortUrl);

    if (!url) throw new HttpError('Url not found', 404);

    return { status: 200, url };
  }
}

export default RedirectToUrl;
