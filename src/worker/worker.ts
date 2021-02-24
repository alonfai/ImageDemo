import { Interfaces } from 'utils';
import { processData } from '../processData';

export function processWebWorker(keys: string[]): Interfaces.WebWorkerOutput {
  return processData(keys);
}
