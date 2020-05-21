import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config();
dotenv.config({ path: resolve(__dirname, '..', '..', '..', '.env') });

process.env.CONNECTION_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.MONGO_TEST
    : process.env.MONGO_URI;

export const { PORT, BASE_URL, CONNECTION_URI } = process.env;
