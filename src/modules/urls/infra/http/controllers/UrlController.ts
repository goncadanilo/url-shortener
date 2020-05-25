import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShortenUrlService from '@modules/urls/services/ShortenUrlService';
import FindByShortenUrlService from '@modules/urls/services/FindByShortenUrlService';

class UrlController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { url } = request.body;

    const shortenUrlService = container.resolve(ShortenUrlService);
    const newUrl = await shortenUrlService.execute(url);

    return response.status(201).json({ newUrl });
  }

  public async getUrl(request: Request, response: Response): Promise<void> {
    const { shortUrl } = request.params;

    const findByShortenUrlService = container.resolve(FindByShortenUrlService);
    const url = await findByShortenUrlService.execute(shortUrl);

    return response.status(301).redirect(url);
  }
}

export default UrlController;
