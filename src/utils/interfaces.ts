export interface Color {
  r: number;
  g: number;
  b: number;
}

export interface Position {
  left: number;
  top: number;
}

export interface WebWorkerInput {
  keys: string[];
}

export interface WebWorkerOutput {
  key: string;
  color: Color;
}

export type WebWorkerFunction = (data: WebWorkerInput) => WebWorkerOutput;
