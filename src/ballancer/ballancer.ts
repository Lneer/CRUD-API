/* eslint-disable no-restricted-syntax */
import cluster from 'node:cluster';
import { cpus } from 'node:os';
import { User } from '../types/user';
import { Processes } from '../constants/constants';

let GLOBAL_DATA:User[] = [];

export const ballancer = (cb: () => void) => {
  if (cluster.isPrimary) {
    const cpusCount = cpus().length;
    console.log(Processes.CPUs, cpusCount);
    console.log(Processes.Primary, process.pid, '\n');
    cpus().forEach(() => {
      const worker = cluster.fork();
      worker.send({ message: 'data', payload: JSON.stringify(GLOBAL_DATA) });
      // worker.on('exit', () => {
      //   console.log(Processes.WorkerExid, worker.process.pid);
      //   cluster.fork();
      // });
    });
    cluster.on('message', (_worker, data: {message:string; payload:User[] }) => {
      const { message, payload } = data;
      if (message === 'updatedStore' && payload) {
        GLOBAL_DATA = [...payload];

        for (const id in cluster.workers) {
          if (cluster.workers && cluster.workers[id]) {
            const w = cluster.workers[+id];
            w?.send({ message: 'data', payload: JSON.stringify(payload) });
          }
        }
      }
    })
      .on('exit', (worker) => {
        console.log(`Worker died! ${worker.process.pid}`);
        cluster.fork();
        cluster.fork().send({ message: 'data', payload: JSON.stringify(GLOBAL_DATA) });
      });
  }

  if (cluster.isWorker) {
    const id = cluster.worker?.id;
    console.log(`Worker: ${id}, pid: ${process.pid}`);
    cb();
  }
};
