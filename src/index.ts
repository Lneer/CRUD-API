import { createServer } from 'http';
import {
  ApiData, OperationMessage, Processes, StatusCode,
} from './constants/constants';
import { ballancer } from './ballancer/ballancer';
import { userRoutes } from './routes/userRoutes';
import { slashTrim } from './utils/slashTrim';

require('dotenv').config();

const PORT = process.env.PORT || ApiData.DefaultPort;

export const server = createServer(async (req, res) => {
  console.log(Processes.Current, process.pid);

  if (slashTrim(req.url)?.includes(ApiData.BASE_URL)) {
    await userRoutes(req, res);
    res.on('error', () => {
      res.writeHead(StatusCode.ServerDown, { 'Content-Type': 'application/json' });
      res.end(OperationMessage.ServerDown);
    });
  } else {
    res.writeHead(StatusCode.NotFound, { 'Content-Type': 'application/json' });
    res.end(OperationMessage.NotFoundPath);
  }
});

if (process.env.NODE_MULTI) {
  ballancer(() => {
    server.listen(PORT, () => {
      console.log(`${Processes.Run} ${PORT}`);
      console.log(Processes.Current, process.pid);
    });
  });
} else {
  server.listen(PORT, () => console.log(`${Processes.Run} ${PORT}`));
}
