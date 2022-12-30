import { createReadStream } from 'fs';
import { createServer } from 'http';
import data from './data';
const DBPATH = './src/data.json';

const PORT = process.env.PORT || 5000;


const server = createServer(async (req, res) => {
	const path = req.url ? req.url : ''
	const pathArr = path.split('/')
	const url = new URL(path)
	const routeId = req.url?.split('/')[3];

	if (req.url === '/api/users' && !routeId && req.method === 'GET') {

		const readStream = createReadStream(DBPATH)
		res.writeHead(200, { "Content-Type": "application/json" });
		readStream.on('data', (chunk) => res.write(chunk))
		readStream.on('end', () => res.end())
		readStream.on('error', () => { res.writeHead(500, { "DataError": "server error" }); res.end("Server Error") })
	}

	if (req.url === `/api/users/${routeId}` && req.method === 'GET') {
		res.writeHead(200, { "Content-Type": "application/json" });

		res.end(JSON.stringify(routeId));
	}

	else {
		res.writeHead(404, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ message: "Route not found" }));
	}
})

server.listen(PORT, () => {
	console.log(`server started on port: ${PORT}`);
});