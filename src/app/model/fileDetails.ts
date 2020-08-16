import { LineDetails } from './lineDetails';

export class FileDetails {
  constructor(public id: number, public path: string, public numberOfDistinctAuthors: number, public numberOfChanges: number, public lines: LineDetails[]) {}
}
