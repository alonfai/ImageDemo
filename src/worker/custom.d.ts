declare module 'comlink-loader!*' {
  import { Interfaces } from 'utils';

  class WebpackWorker extends Worker {
    constructor();

    processWebWorker(keys: string[]): Promise<Interfaces.WebWorkerOutput>;
  }

  export = WebpackWorker;
}
