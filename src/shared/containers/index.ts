import { container } from 'tsyringe';

import IUrlRepository from '@modules/urls/repositories/IUrlRepository';
import UrlRepository from '@modules/urls/infra/mongodb/repositories/UrlRepository';

container.registerSingleton<IUrlRepository>('UrlRepository', UrlRepository);
