export interface Line {
  content: string;
  lineNumber: number;
  numberOfChanges: number;
  numberOfAuthors: number;
  isCovered: boolean;
  hitCount: number;
  conditionCoverage: string;
  isBranched: boolean;
}
