import HttpError from '../errors/HttpError';
import validUrl from '../utils/validUrl';

import IUrlRepository from '../repositories/interfaces/IUrlRepository';

interface IResponse {
  status: number;
  newUrl: string;
}

class ShortenUrlService {
  constructor(private readonly urlRepository: IUrlRepository) {}

  public async execute(originalUrl: string): Promise<IResponse> {
    if (!validUrl(originalUrl)) throw new HttpError('Invalid url!');

    const newUrl = await this.urlRepository.create(originalUrl);
    return { status: 201, newUrl };
  }
}

export default ShortenUrlService;
