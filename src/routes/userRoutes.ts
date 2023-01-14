import { IncomingMessage, ServerResponse } from "http";
import { getEndPoint } from "../utils/getEndPoint";
import { addUser, deleteUser, getUserById, getUsers, updateUser } from "../models/usersMethods";
import { getBody } from "../utils/getBody";


export const userRoutes = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
	const path = getEndPoint(req.url)

	const errorHandler = (error: Error) => {
		res.writeHead(400, { "Content-Type": "text/json" });
		res.write(error.message);
		res.end();
	}

	if (path === 'api/users' && req.method === 'GET') {
		try {
			const users = await getUsers();
			res.writeHead(200, { "Content-Type": "text/json" });
			res.write(JSON.stringify(users));
			res.end();
		} catch (error) {
			errorHandler(error as Error)
		}

	}

	if (!path?.includes('api/users') && req.method === 'GET') {
		try {
			const user = await getUserById(path as string);
			res.writeHead(200, { "Content-Type": "text/json" });
			res.write(JSON.stringify(user));
			res.end();
		} catch (error) {
			errorHandler(error as Error)
		}

	}

	if (path === 'api/users' && req.method === 'POST') {
		try {
			const body = await getBody(req)
			const users = await addUser(body);
			res.writeHead(200, { "Content-Type": "text/json" });
			res.write(JSON.stringify(users));
			res.end();
		} catch (error) {
			errorHandler(error as Error)
		}

	}

	if (!path?.includes('api/users') && req.method === 'DELETE') {
		try {
			const user = await deleteUser(path as string);
			res.writeHead(200, { "Content-Type": "text/json" });
			res.write(JSON.stringify(user));
			res.end();
		} catch (error) {
			errorHandler(error as Error)
		}

	}

	if (!path?.includes('api/users') && req.method === 'PUT') {
		try {
			const body = await getBody(req)
			const user = await updateUser({ ...body, _id: path });
			res.writeHead(200, { "Content-Type": "text/json" });
			res.write(JSON.stringify(user));
			res.end();
		} catch (error) {
			errorHandler(error as Error)
		}
	}
}
