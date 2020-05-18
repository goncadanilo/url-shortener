import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShortenUrlService from '@modules/urls/services/ShortenUrlService';

class UrlController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { url } = request.body;

    if (!url)
      return response
        .status(400)
        .json({ status: 'error', message: 'Missing param: url' });

    const shortenUrlService = container.resolve(ShortenUrlService);
    const { status, newUrl } = await shortenUrlService.execute(url);

    return response.status(status).json({ newUrl });
  }
}

export default UrlController;
