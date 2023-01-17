import { v4 as uuidv4 } from 'uuid';
import { User } from '../types/user';
import { OperationMessage } from '../constants/constants';

const users: User[] = [];

export const getUsers = (): Promise<User[]> => new Promise((res, rej) => {
  if (users && Array.isArray(users)) {
    res(users);
  } else {
    rej(new Error('Data not found'));
  }
});

export const getUserById = (id: string): Promise<User | undefined> => new Promise((res, rej) => {
  const user = users.find((item) => item.id === id);

  if (!user) {
    rej(new Error(OperationMessage.NotFound));
    return;
  }
  res(user);
});

export const addUser = (user: User): Promise<User> => new Promise((res) => {
  const addedUser: User = { ...user, id: uuidv4() };
  users.push(addedUser);
  res(addedUser);
});

export const deleteUser = (id: string): Promise<User> => new Promise((res, rej) => {
  const userIndex = users.findIndex((item) => item.id === id);
  if (userIndex < 0) {
    rej(new Error(OperationMessage.NotFound));
    return;
  }

  const user = users[userIndex];
  users.splice(userIndex, 1);
  res(user);
});

export const updateUser = (user: User): Promise<User> => new Promise((res, rej) => {
  const userIndex = users.findIndex((item) => item.id === user.id);
  console.log(userIndex);
  if (userIndex < 0) {
    rej(new Error(OperationMessage.NotFound));
    return;
  }
  users.splice(userIndex, 1, user);
  res(user);
});
