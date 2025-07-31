// tests/integration/wanted.test.js
const request = require('supertest');

const baseURL = 'http://localhost:3000';

describe('GET /api/v1/wanted', () => {
it('should return list of wanted persons', async () => {
  const res = await request(baseURL).get('/api/v1/wanted');
  expect(res.statusCode).toBe(200);
  const results = res.body.data.results
  expect(Array.isArray(results)).toBe(true); //
  if (results.length) {
    expect(results[0]).toHaveProperty('title');
    expect(results[0]).toHaveProperty('id');
  }
});

  it('should filter by sex=male', async () => {
    const res = await request(baseURL).get('/api/v1/wanted?sex=male');
    expect(res.statusCode).toBe(200);
  });

  it('should filter by reward range', async () => {
    const res = await request(baseURL).get('/api/v1/wanted?reward_min=100000');
    expect(res.statusCode).toBe(200);
  });
});

describe('GET /api/v1/wanted/:id', () => {
  it('should return person detail by ID', async () => {
    const listRes = await request(baseURL).get('/api/v1/wanted');
    const person = listRes.body.data.results[0];
    expect(person).toBeTruthy();

    const res = await request(baseURL).get(`/api/v1/wanted/${person.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty('title');
  });

  it('should return 404 for invalid ID', async () => {
    const res = await request(baseURL).get('/api/v1/wanted/adfasdfasdf');
    console.log(res.statusCode)
    expect(res.statusCode).toBe(404);
  });
});
