import { injectable, inject } from 'tsyringe';

import HttpError from '@shared/errors/HttpError';
import IUrlRepository from '@modules/urls/repositories/IUrlRepository';
import IUrlValidation from '@modules/urls/providers/UrlValidation/models/IUrlValidation';

@injectable()
class ShortenUrlService {
  constructor(
    @inject('UrlRepository')
    private readonly urlRepository: IUrlRepository,

    @inject('UrlValidation')
    private readonly urlValidation: IUrlValidation,
  ) {}

  public async execute(originalUrl: string): Promise<string> {
    if (!this.urlValidation.test(originalUrl))
      throw new HttpError('Invalid url');

    const newUrl = await this.urlRepository.create(originalUrl);
    return newUrl;
  }
}

export default ShortenUrlService;
