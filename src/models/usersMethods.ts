import { v4 as uuidv4 } from 'uuid';
import { User } from '../types/user';

const users: User[] = [];

export const getUsers = (): Promise<User[]> => new Promise((res, rej) => {
  if (users && Array.isArray(users)) {
    res(users);
  } else {
    rej(new Error('Data not found'));
  }
});

export const getUserById = (id: string): Promise<User | undefined> => new Promise((res, rej) => {
  const user = users.find((item) => item._id === id);

  if (!user) {
    rej(new Error('User not found'));
  }
  res(user);
});

export const addUser = (user: Omit<User, '_id'>): Promise<User> => new Promise((res, rej) => {
  const keys = Object.keys(user);
  keys.forEach((key) => {
    if (!user[key as keyof Omit<User, '_id'>]) {
      rej(new Error(`${key} not found`));
    }
  });

  const addedUser: User = { ...user, _id: uuidv4() };
  users.push(addedUser);
  res(addedUser);
});

export const deleteUser = (id: string): Promise<User[]> => new Promise((res, rej) => {
  const userIndex = users.findIndex((item) => item._id === id);

  if (userIndex === -1) {
    rej(new Error('User not found'));
  }

  users.splice(userIndex, 1);
  res(users);
});

export const updateUser = (user: User): Promise<User[]> => new Promise((res, rej) => {
  const userIndex = users.findIndex((item) => item._id === user._id);
  if (userIndex === -1) {
    rej(new Error('User not found'));
  }
  users.splice(userIndex, 1, user);
  res(users);
});
