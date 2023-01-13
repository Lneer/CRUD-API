import { createReadStream } from 'fs';
import { createServer } from 'http';
import data from './data';
import { getUsers } from './users/usersMethods';
const DBPATH = './src/data.json';
import url from 'node:url';
import { slashTrim } from './utils/slashTrim';

const PORT = process.env.PORT || 5000;
const BASE_URL = 'api/users'


const server = createServer(async (req, res) => {
	const path = slashTrim(req.url ? req.url : '')

	const endPoint = path.toLowerCase().replace(BASE_URL, '')

	// const currentUrl = url.parse(path,)

	// const pathArr = path.split('/')
	// const routeId = req.url?.split('/')[3];

	res.writeHead(200, { "Content-Type": "text/html" });
	res.write(`<h2>${req.url}</h2><h2>${path}</h2>`)
	res.end();

	if (req.url === '/api/users' && req.method === 'GET') {


		// const users = await getUsers();
		// res.writeHead(200, { "Content-Type": "application/json" });
		// res.write(JSON.stringify(users))
		res.end()
		// const readStream = createReadStream(DBPATH)
		// res.writeHead(200, { "Content-Type": "application/json" });
		// readStream.on('data', (chunk) => res.write(chunk))
		// readStream.on('end', () => res.end())
		// readStream.on('error', () => { res.writeHead(500, { "DataError": "server error" }); res.end("Server Error") })
	}

	// if (req.url === `/api/users/${routeId}` && req.method === 'GET') {
	// 	res.writeHead(200, { "Content-Type": "application/json" });

	// 	res.end(JSON.stringify(routeId));
	// }

	else {
		res.writeHead(404, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ message: "Route not found" }));
	}
})

server.listen(PORT, () => {
	console.log(`server started on port: ${PORT}`);
});