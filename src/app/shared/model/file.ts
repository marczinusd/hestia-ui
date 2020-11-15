import { Line } from './line';

export interface File {
  id: string;
  snapshotId: string;
  path: string;
  filename: string;
  lifetimeChanges: number;
  lifetimeAuthors: number;
  coveragePercentage: number;
  lines: Line[];
}
