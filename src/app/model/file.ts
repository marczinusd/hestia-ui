import { Line } from './line';

export interface File {
  id: string;
  path: string;
  lifetimeChanges: number;
  lifetimeAuthors: number;
  coveragePercentage: number;
  lines: Line[];
}
