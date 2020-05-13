import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import routes from './routes';
import createConnection from './database/connection';

createConnection();
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

export default app;
