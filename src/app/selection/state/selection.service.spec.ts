import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { SelectionService } from './selection.service';
import { SelectionQuery } from './selection.query';

describe('SnapshotsService', () => {
  let spectator: SpectatorService<SelectionService>;
  const createService = createServiceFactory<SelectionService>({
    service: SelectionService
  });

  beforeEach(() => (spectator = createService()));

  it('should update state correctly', () => {
    const query = spectator.inject(SelectionQuery);
    spectator.service.setFileSelection({ path: 'bla', numberOfChanges: 0, numberOfAuthors: 0, name: '', lines: [], id: '42' });

    expect(query.getValue().selectedFileId.id).toBe('42');
  });
});
