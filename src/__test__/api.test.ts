import request from 'supertest';
import { server } from '../index';
import { User } from '../types/user';
import { OperationMessage, StatusCode } from '../constants/constants';

const postData: User = {
  username: 'Vasya',
  age: 20,
  hobbies: ['game', 'coding'],
};

const putData: User = {
  username: 'Petya',
  age: 21,
  hobbies: [],
};

const postIncorrectData = {
  age: 21,
  hobbies: [],
};

describe('Valid crud requests', () => {
  let id: string;
  it('Get users', async () => {
    await request(server)
      .get('/api/users')
      .expect(StatusCode.OK)
      .expect(({ body }) => {
        expect(body).toHaveLength(0);
      });
  });

  it('Create new user', async () => {
    await request(server)
      .post('/api/users')
      .set('Content-type', 'application/json')
      .send(postData)
      .expect(StatusCode.Create)
      .expect(({ body }) => {
        id = body.id;
        const expectedResults = { ...postData, id };
        expect(body).toEqual(expectedResults);
      });
  });

  it('get created user', async () => {
    await request(server)
      .get(`/api/users/${id}`)
      .expect(StatusCode.OK)
      .expect(({ body }) => {
        const expectedResults = { ...postData, id };
        expect(body).toEqual(expectedResults);
      });
  });

  it('update user', async () => {
    await request(server)
      .put(`/api/users/${id}`)
      .set('Content-type', 'application/json')
      .send(putData)
      .expect(StatusCode.OK)
      .expect(({ body }) => {
        id = body.id;
        const expectedResults = { ...putData, id };
        expect(body).toEqual(expectedResults);
      });
  });

  it('get updated user', async () => {
    await request(server)
      .get(`/api/users/${id}`)
      .expect(StatusCode.OK)
      .expect(({ body }) => {
        const expectedResults = { ...putData, id };
        expect(body).toEqual(expectedResults);
      });
  });

  it('delete user', async () => {
    await request(server)
      .del(`/api/users/${id}`)
      .expect(StatusCode.Delete);
  });

  it('Get users', async () => {
    await request(server)
      .get('/api/users')
      .expect(StatusCode.OK)
      .expect(({ body }) => {
        expect(body).toHaveLength(0);
      });
  });
});

describe('incorrect inputs', () => {
  let id: string;
  const invalidId = '9b1deb4d3b7d4bad9bdd2b0d7b3dcb6d';

  it('get user by invalid Id', async () => {
    await request(server)
      .get(`/api/users/${invalidId}/`)
      .expect(StatusCode.BadRequest)
      .expect(({ body }) => {
        expect(body).toEqual(OperationMessage.InvalidId);
      });
  });
  it('create user with wrong route', async () => {
    await request(server)
      .post(`/api/users/${invalidId}/`)
      .set('Content-type', 'application/json')
      .send(postData)
      .expect(StatusCode.NotFound)
      .expect(({ body }) => {
        expect(body).toEqual(OperationMessage.NotFoundPath);
      });
  });
  it('Create new user', async () => {
    await request(server)
      .post('/api/users')
      .set('Content-type', 'application/json')
      .send(postData)
      .expect(StatusCode.Create)
      .expect(({ body }) => {
        id = body.id;
        const expectedResults = { ...postData, id };
        expect(body).toEqual(expectedResults);
      });
  });
  it('update user with invalid route', async () => {
    await request(server)
      .put(`/api/users/${invalidId}`)
      .set('Content-type', 'application/json')
      .send(putData)
      .expect(StatusCode.BadRequest)
      .expect(({ body }) => {
        expect(body).toEqual(OperationMessage.InvalidId);
      });
  });

  it('delete user with invalid route', async () => {
    await request(server)
      .del(`/api/users/${invalidId}`)
      .expect(StatusCode.BadRequest)
      .expect(({ body }) => {
        expect(body).toEqual(OperationMessage.InvalidId);
      });
  });
});

describe('incorrect id', () => {
  let id: string;
  const incorrect = '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb7d';

  it('get user by invalid Id', async () => {
    await request(server)
      .get(`/api/users/${incorrect}/`)
      .expect(StatusCode.NotFound)
      .expect(({ body }) => {
        expect(body).toEqual(OperationMessage.NotFound);
      });
  });
  it('create user with wrong fields', async () => {
    await request(server)
      .post('/api/users/')
      .set('Content-type', 'application/json')
      .send(postIncorrectData)
      .expect(StatusCode.BadRequest)
      .expect(({ body }) => {
        expect(body).toEqual(OperationMessage.InvalidBodyFields);
      });
  });
  it('Create new user', async () => {
    await request(server)
      .post('/api/users')
      .set('Content-type', 'application/json')
      .send(postData)
      .expect(StatusCode.Create)
      .expect(({ body }) => {
        id = body.id;
        const expectedResults = { ...postData, id };
        expect(body).toEqual(expectedResults);
      });
  });

  it('update user with incorrect route', async () => {
    await request(server)
      .put(`/api/users/${incorrect}`)
      .set('Content-type', 'application/json')
      .send(putData)
      .expect(StatusCode.NotFound)
      .expect(({ body }) => {
        expect(body).toEqual(OperationMessage.NotFound);
      });
  });

  it('delete user with incorrect route', async () => {
    await request(server)
      .del(`/api/users/${incorrect}`)
      .expect(StatusCode.NotFound)
      .expect(({ body }) => {
        expect(body).toEqual(OperationMessage.NotFound);
      });
  });
});
