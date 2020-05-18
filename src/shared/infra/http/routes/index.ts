import { Router } from 'express';

import urlRoutes from '@modules/urls/infra/http/routes/urls.routes';

const routes = Router();

routes.use('/', urlRoutes);

export default routes;
