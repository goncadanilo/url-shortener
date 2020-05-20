import 'dotenv/config';
import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import request from 'supertest';
import faker from 'faker';

import app from '@shared/infra/http/app';

describe('Url module', () => {
  let connection: MongoClient;

  beforeAll(async () => {
    connection = await MongoClient.connect(`${process.env.MONGO_TEST}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterEach(async () => {
    await connection.db().collection('urls').drop();
  });

  afterAll(async () => {
    await connection.close();
    mongoose.disconnect();
  });

  it('should be able to create a new url shortcut', async () => {
    const url = faker.internet.url();
    const response = await request(app).post('/url').send({ url });
    const findUrl = await connection
      .db()
      .collection('urls')
      .findOne({ originalUrl: url });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('newUrl');
    expect(findUrl.originalUrl).toBe(url);
  });
});
