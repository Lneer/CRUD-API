import cluster from 'node:cluster';
import { cpus } from 'os';

export const ballancer = (cb: () => void) => {
  if (cluster.isPrimary) {
    const cpusCount = cpus().length;
    console.log('Processes.CPUs', cpusCount);
    console.log('Processes.Primary', process.pid, '\n');
    cpus().forEach(() => {
      const worker = cluster.fork();

      worker.on('exit', () => {
        console.log('worker Exit', worker.process.pid);
        cluster.fork();
      });
    });
  }

  if (cluster.isWorker) cb();
};
