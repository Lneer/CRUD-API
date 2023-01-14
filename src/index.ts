import { createServer } from 'http';
import { userRoutes } from './routes/userRoutes';

const PORT = process.env.PORT || 5000;

const server = createServer(async (req, res) => {
	await userRoutes(req, res)
})

server.listen(PORT, () => {
	console.log(`server started on port: ${PORT}`);
});

