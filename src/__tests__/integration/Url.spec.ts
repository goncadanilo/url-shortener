import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import request from 'supertest';
import faker from 'faker';

import app from '@config/app';
import { CONNECTION_URI } from '@shared/utils/env';

describe('Url module', () => {
  let connection: MongoClient;

  beforeAll(async () => {
    connection = await MongoClient.connect(`${CONNECTION_URI}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterEach(async () => {
    await connection.db().collection('urls').deleteMany({});
  });

  afterAll(async () => {
    await connection.db().collection('urls').drop();
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

  it('should', async () => {
    const url = faker.internet.url();
    const urlCreated = await request(app).post('/url').send({ url });
    const response = await request(app).post('/url').send({ url });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('newUrl');
    expect(response.body.newUrl).toBe(urlCreated.body.newUrl);
  });

  it('should not be able to create a new url shortcut with invalid url', async () => {
    const response = await request(app).post('/url').send({ url: 'any_url' });

    expect(response.status).toBe(400);
  });

  it('should be able reditect to url', async () => {
    const url = faker.internet.url();

    await request(app).post('/url').send({ url });

    const findUrl = await connection
      .db()
      .collection('urls')
      .findOne({ originalUrl: url });
    const response = await request(app).get(`/${findUrl.shortUrl}`);

    expect(response.status).toBe(302);
  });

  it('should', async () => {
    const response = await request(app).get('/anyUrl');

    expect(response.status).toBe(404);
  });
});
