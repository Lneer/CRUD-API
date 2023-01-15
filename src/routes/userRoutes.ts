import { IncomingMessage, ServerResponse } from 'http';
import { getEndPoint } from '../utils/getEndPoint';
import {
  addUser, deleteUser, getUserById, getUsers, updateUser,
} from '../models/usersMethods';
import { getBody } from '../utils/getBody';
import { idValidate } from '../utils/idValidate';

export const userRoutes = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
  const path = getEndPoint(req.url);

  const errorHandler = (error: Error) => {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.write(error.message);
    res.end();
  };

  if (path === 'api/users' && req.method === 'GET') {
    try {
      const users = await getUsers();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(users));
      res.end();
    } catch (error) {
      errorHandler(error as Error);
    }
  }

  if (!path?.includes('api/users') && req.method === 'GET') {
    if (!idValidate(path as string)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end('Bad request');
      return;
    }
    try {
      const user = await getUserById(path as string);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(user));
      res.end();
    } catch (error) {
      errorHandler(error as Error);
    }
  }

  if (path === 'api/users' && req.method === 'POST') {
    try {
      const body = await getBody(req);
      const users = await addUser(body);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(users));
      res.end();
    } catch (error) {
      errorHandler(error as Error);
    }
  }

  if (!path?.includes('api/users') && req.method === 'DELETE') {
    if (!idValidate(path as string)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end('Bad request');
      return;
    }
    try {
      const user = await deleteUser(path as string);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(user));
      res.end();
    } catch (error) {
      errorHandler(error as Error);
    }
  }

  if (!path?.includes('api/users') && req.method === 'PUT') {
    if (!idValidate(path as string)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end('Bad request');
      return;
    }
    try {
      const body = await getBody(req);
      const user = await updateUser({ ...body, _id: path });
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(user));
      res.end();
    } catch (error) {
      errorHandler(error as Error);
    }
  }
};
