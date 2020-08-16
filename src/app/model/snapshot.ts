import { FileHeader as ModelFile } from './fileHeader';

export class Snapshot {
  constructor(public id: number, public name: string, public hash: string, public files: ModelFile[]) {}
}
