import { File } from '../model/file';

import { mockLines } from './lines.mock';

export const mockFile: File = {
  snapshotId: 'snapshotId',
  filename: 'bla.ts',
  path: 'path/bla.ts',
  lifetimeChanges: 3,
  lines: mockLines,
  id: 'id',
  coveragePercentage: 100,
  lifetimeAuthors: 5
};
