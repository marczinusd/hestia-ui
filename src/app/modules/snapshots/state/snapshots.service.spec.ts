import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SnapshotsService } from './snapshots.service';
import { SnapshotsStore } from './snapshots.store';

describe('SnapshotsService', () => {
  let snapshotsService: SnapshotsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SnapshotsService, SnapshotsStore],
      imports: [HttpClientTestingModule]
    });

    snapshotsService = TestBed.inject(SnapshotsService);
  });

  it('should be created', () => {
    expect(snapshotsService).toBeDefined();
  });
});
