import { User } from "../types/user";
import { v4 as uuidv4 } from 'uuid';

const users: User[] = [];

const getUsers = (): Promise<User[]> => new Promise((res, rej) => {
	try {
		res(users);
	} catch (error) {
		rej(error)
	}
});

const getUserById = (id: string): Promise<User | undefined> => new Promise((res, rej) => {
	try {
		const user = users.find((item) => item._id === id)
		res(user);
	} catch (error) {
		rej(error)
	}
});

const addUser = (user: User): Promise<User[]> => new Promise((res, rej) => {
	users.push({ ...user, _id: uuidv4() })
	try {
		res(users);
	} catch (error) {
		rej(error)
	}
});

const deleteUser = (id: string): Promise<User[]> => new Promise((res, rej) => {
	const userIndex = users.findIndex((item) => item._id === id);
	if (userIndex !== -1) {
		users.splice(userIndex, 1)
	}
	try {
		res(users);
	} catch (error) {
		rej(error)
	}
});
