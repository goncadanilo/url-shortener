import { injectable, inject } from 'tsyringe';

import IUrlRepository from '@modules/urls/repositories/IUrlRepository';

@injectable()
class ShortenUrlService {
  constructor(
    @inject('UrlRepository')
    private readonly urlRepository: IUrlRepository,
  ) {}

  public async execute(originalUrl: string): Promise<string> {
    const newUrl = await this.urlRepository.create(originalUrl);
    return newUrl;
  }
}

export default ShortenUrlService;
