import { SnapshotsService } from './snapshots.service';
import { SpectatorService, createServiceFactory } from '@ngneat/spectator/jest';

describe('SnapshotsService', () => {
  let spectator: SpectatorService<SnapshotsService>;
  const createService = createServiceFactory(SnapshotsService);

  beforeEach(() => (spectator = createService()));

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });

  describe('getAllHeaders()', () => {
    it('should return a single mock header for now', () => {
      expect(spectator.service.getAllHeaders()).toHaveLength(1);
    });
  });

  describe('getSnapshotDetails(id)', () => {
    it('should return mock details with id passed in', () => {
      expect(spectator.service.getSnapshotDetails(1).id).toBe(1);
    });
  });
});
