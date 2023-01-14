import { IncomingMessage } from "http";
import { User } from "../types/user";

export const getBody = (req: IncomingMessage): Promise<User> => new Promise((resolve, reject) => {
	let body = '';
	req.on('data', (chunk) => { body += chunk.toString() })
	req.on('error', () => reject(new Error('body not read')))
	req.on('end', () => {
		try {
			resolve(JSON.parse(body))
		} catch (error) {
			reject(new Error('Bad request'))
		}
	})
})