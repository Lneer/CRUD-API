import { IncomingMessage, ServerResponse } from 'http';
import { getEndPoint } from '../utils/getEndPoint';
import {
  addUser, deleteUser, getUserById, getUsers, updateUser,
} from '../models/usersMethods';
import { OperationMessage, StatusCode } from '../constants/constants';
import { getBody } from '../utils/getBody';
import { idValidate } from '../utils/idValidate';
import { bodyFieldsValidate } from '../utils/bodyFieldsValidate';

export const userRoutes = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
  const path = getEndPoint(req.url);

  const errorHandler = (error: Error) => {
    res.writeHead(StatusCode.NotFound, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(error.message));
    res.end();
  };

  if (path === 'api/users' && req.method === 'GET') {
    try {
      const users = await getUsers();
      res.writeHead(StatusCode.OK, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(users));
      res.end();
    } catch (error) {
      errorHandler(error as Error);
    }
  } else if (!path?.includes('api/users') && req.method === 'GET') {
    if (!idValidate(path as string)) {
      res.writeHead(StatusCode.BadRequest, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(OperationMessage.InvalidId));
      return;
    }
    try {
      const user = await getUserById(path as string);
      res.writeHead(StatusCode.OK, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(user));
      res.end();
    } catch (error) {
      errorHandler(error as Error);
    }
  } else if (path === 'api/users' && req.method === 'POST') {
    try {
      const body = await getBody(req);
      if (!bodyFieldsValidate(body)) {
        res.writeHead(StatusCode.BadRequest, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(OperationMessage.InvalidBodyFields));
        return;
      }
      const users = await addUser(body);
      res.writeHead(StatusCode.Create, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(users));
      res.end();
    } catch (error) {
      errorHandler(error as Error);
    }
  } else if (!path?.includes('api/users') && req.method === 'DELETE') {
    if (!idValidate(path as string)) {
      res.writeHead(StatusCode.BadRequest, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(OperationMessage.InvalidId));
      return;
    }
    try {
      const user = await deleteUser(path as string);
      res.writeHead(StatusCode.Delete, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(user));
      res.end();
    } catch (error) {
      errorHandler(error as Error);
    }
  } else if (!path?.includes('api/users') && req.method === 'PUT') {
    if (!idValidate(path as string)) {
      res.writeHead(StatusCode.BadRequest, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(OperationMessage.InvalidId));
      return;
    }
    try {
      const body = await getBody(req);
      const user = await updateUser({ ...body, id: path });
      res.writeHead(StatusCode.OK, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    } catch (error) {
      errorHandler(error as Error);
    }
  } else {
    res.writeHead(StatusCode.NotFound, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(OperationMessage.NotFoundPath));
  }
};
