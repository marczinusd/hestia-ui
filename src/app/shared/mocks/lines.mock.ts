import { Line } from '../model/line';

export const mockLines: Line[] = [
  { content: 'hello', lineNumber: 1, numberOfAuthors: 2, numberOfChanges: 3, isCovered: true, conditionCoverage: '100%', isBranched: true, hitCount: 0 },
  { content: 'world', lineNumber: 2, numberOfAuthors: 2, numberOfChanges: 3, isCovered: false, conditionCoverage: '', isBranched: false, hitCount: 0 }
];
