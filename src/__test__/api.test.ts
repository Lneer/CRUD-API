import request from 'supertest';
import { server } from '..';

describe('test', () => {
  it('Get users', async () => {
    const response = await request(server).get('./users');
    expect(response.statusCode).toEqual(200);
  });
});
