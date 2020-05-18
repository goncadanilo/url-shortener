import HttpError from '@shared/errors/HttpError';
import IUrlRepository from '@modules/urls/repositories/IUrlRepository';
import IUrlValidationProvider from '@modules/urls/providers/UrlValidation/models/IUrlValidation';

interface IResponse {
  status: number;
  newUrl: string;
}

class ShortenUrlService {
  constructor(
    private readonly urlRepository: IUrlRepository,
    private readonly urlValidationProvider: IUrlValidationProvider,
  ) {}

  public async execute(originalUrl: string): Promise<IResponse> {
    if (!this.urlValidationProvider.test(originalUrl))
      throw new HttpError('Invalid url');

    const newUrl = await this.urlRepository.create(originalUrl);
    return { status: 201, newUrl };
  }
}

export default ShortenUrlService;
