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
    await connection.db().collection('urls').deleteMany({});
  });

  afterAll(async () => {
    await connection.db().collection('urls').drop();
    await connection.close();
    mongoose.disconnect();
  });

  it('should be able create a new shorten url', async () => {
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

  it('should not be able shorten a duplicate url', async () => {
    const url = faker.internet.url();
    const urlCreated = await request(app).post('/url').send({ url });
    const response = await request(app).post('/url').send({ url });
    const count = await connection
      .db()
      .collection('urls')
      .find({ originalUrl: url })
      .count();

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('newUrl');
    expect(response.body.newUrl).toBe(urlCreated.body.newUrl);
    expect(count).toBe(1);
  });

  it('should not be able create a new shorten url with invalid url', async () => {
    const response = await request(app).post('/url').send({ url: 'any_url' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Invalid url');
  });

  it('should returns 302 when reditect to url', async () => {
    const url = faker.internet.url();

    await request(app).post('/url').send({ url });

    const findUrl = await connection
      .db()
      .collection('urls')
      .findOne({ originalUrl: url });
    const response = await request(app).get(`/${findUrl.shortUrl}`);

    expect(response.status).toBe(302);
  });

  it('should returns 404 if short url is not found', async () => {
    const response = await request(app).get('/anyUrl');

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Url not found');
  });

  it('should returns 400 if invalid short url is provided', async () => {
    const response = await request(app).get('/any_url');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('Invalid short url');
  });
});
