import { container } from 'tsyringe';

import IUrlRepository from '@modules/urls/repositories/IUrlRepository';
import UrlRepository from '@modules/urls/infra/mongodb/repositories/UrlRepository';

import IUrlValidation from '@modules/urls/providers/UrlValidation/models/IUrlValidation';
import UrlValidation from '@modules/urls/providers/UrlValidation/implementations/UrlValidation';

container.registerSingleton<IUrlRepository>('UrlRepository', UrlRepository);

container.registerSingleton<IUrlValidation>('UrlValidation', UrlValidation);
