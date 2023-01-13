import { User } from "../types/user";
import { v4 as uuidv4 } from 'uuid';

const users: User[] = [];

export const getUsers = (): Promise<User[]> => new Promise((res, rej) => {

	if (users && Array.isArray(users)) {
		res(users)
	}
	else {
		rej(new Error('Data not found'))
	}
});


export const getUserById = (id: string): Promise<User | undefined> => new Promise((res, rej) => {
	try {
		const user = users.find((item) => item._id === id)
		res(user);
	} catch (error) {
		rej(error)
	}
});

export const addUser = (user: User): Promise<User[]> => new Promise((res, rej) => {
	users.push({ ...user, _id: uuidv4() })
	try {
		res(users);
	} catch (error) {
		rej(error)
	}
});

export const deleteUser = (id: string): Promise<User[]> => new Promise((res, rej) => {
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
