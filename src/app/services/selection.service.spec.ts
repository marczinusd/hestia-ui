import { SelectionService } from './selection.service';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { TestScheduler } from 'rxjs/testing';

describe('SelectionService', () => {
  let spectator: SpectatorService<SelectionService>;
  const testScheduler = new TestScheduler((actual, expected) => expect(actual).toStrictEqual(expected));

  beforeEach(() => {
    spectator = createServiceFactory({ service: SelectionService })();
  });

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should emit newly selected file if selectFile() was called', () => {
    testScheduler.run(({ expectObservable }) => {
      spectator.service.selectFile('1');

      expectObservable(spectator.service.selectedFileId).toBe('a', { a: '1' });
    });
  });
});
