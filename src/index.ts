import { createServer } from 'http';
import { userRoutes } from './routes/userRoutes';

require('dotenv').config();

const PORT = process.env.PORT || 5000;

const server = createServer(async (req, res) => {
  await userRoutes(req, res);
  res.on('error', () => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end('Server is broken');
  });
});

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
