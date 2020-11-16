import { Snapshot } from '../model/snapshot';

import { mockFile } from './file.mock';

export const mockSnapshot: Snapshot = {
  files: [mockFile],
  name: 'snapshot',
  id: 'snapshotId',
  atHash: 'hash',
  commitDate: '2020-10-20'
};
