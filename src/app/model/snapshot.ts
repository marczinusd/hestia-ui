import { File } from './file';

export interface Snapshot {
  id: string;
  name: string;
  atHash: string;
  commitDate: string;
  files: File[];
}
