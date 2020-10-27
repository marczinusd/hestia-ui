import { Line } from './line';

export interface File {
  id: string;
  path: string;
  numberOfAuthors: number;
  numberOfCommits: number;
  lines: Line[];
}
