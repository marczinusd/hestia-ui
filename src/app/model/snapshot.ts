import { File as ModelFile } from '../model/file';

export class Snapshot {
  constructor(
    public id: number,
    public name: string,
    public hash: string,
    public files: ModelFile[]
  ) {}
}
