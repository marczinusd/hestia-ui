import { SelectionService } from './selection.service';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { TestScheduler } from 'rxjs/testing';

describe('SelectionService', () => {
  let spectator: SpectatorService<SelectionService>;

  beforeEach(() => {
    spectator = createServiceFactory({ service: SelectionService })();
  });

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should emit newly selected file if selectFile() was called', () => {
    const emittedValues = [];
    spectator.service.selectedFileId.subscribe((val) => emittedValues.push(val));
    spectator.service.selectFile('1');

    expect(emittedValues).toHaveLength(1);
  });
});
