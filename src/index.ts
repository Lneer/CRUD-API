import { createReadStream } from 'fs';
import { createServer } from 'http';
import data from './data';
const DBPATH = 'data.ts';

const PORT = process.env.PORT || 5000;

const server = createServer(async (req, res) => {

	const routeId = req.url?.split('/')[3];

	if (req.url === '/api/users' && !routeId && req.method === 'GET') {
		res.writeHead(200, { "Content-Type": "application/json" });
		res.write(JSON.stringify(data))
		res.end();
	}

	if (req.url === `/api/users/${routeId}` && req.method === 'GET') {
		res.writeHead(200, { "Content-Type": "application/json" });

		const response = data.find((elem) => elem._id === routeId)
		res.write(JSON.stringify(response))
		res.end();
	}

	else {
		res.writeHead(404, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ message: "Route not found" }));
	}
})

server.listen(PORT, () => {
	console.log(`server started on port: ${PORT}`);
});