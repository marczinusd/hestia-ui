export interface Line {
  lineNumber: number;
  content: string;
  isCovered: boolean;
  numberOfAuthors: number;
  numberOfChanges: number;
}

export interface File {
  id: string;
  path: string;
  coveragePercentage: number;
  numberOfAuthors: number;
  numberOfChanges: number;
  lines: Line[];
}

export interface Snapshot {
  id: string;
  name: string;
  atHash: string;
  commitDate: string;
  files: File[];
}

export function createSnapshot(params: Partial<Snapshot>): Snapshot {
  return {
    ...params
  } as Snapshot;
}

export function createFile(params: Partial<File>): File {
  return {
    ...params
  } as File;
}
