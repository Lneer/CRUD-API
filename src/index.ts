import { createServer } from 'http';
import { StatusCode } from './constants/constants';
import { ballancer } from './ballancer/ballancer';
import { userRoutes } from './routes/userRoutes';
import { slashTrim } from './utils/slashTrim';

require('dotenv').config();

const PORT = process.env.PORT || 5000;

export const server = createServer(async (req, res) => {
  if (slashTrim(req.url)?.includes('api/users')) {
    await userRoutes(req, res);
    res.on('error', () => {
      res.writeHead(StatusCode.OK, { 'Content-Type': 'application/json' });
      res.end('Server is broken');
    });
  } else {
    res.writeHead(StatusCode.NotFound, { 'Content-Type': 'application/json' });
    res.end('page not found');
  }
});

if (process.env.NODE_MULTI) {
  ballancer(() => {
    server.listen(PORT, () => {
      console.log(`{Processes.Run} ${PORT}`);
      console.log('Processes.Current', process.pid);
    });
  });
} else {
  server.listen(PORT, () => console.log(`{Processes.Run} ${PORT}`));
}
