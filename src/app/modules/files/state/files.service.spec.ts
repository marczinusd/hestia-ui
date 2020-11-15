import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { FilesService } from './files.service';
import { FilesStore } from './files.store';

describe('FilesService', () => {
  let filesService: FilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilesService, FilesStore],
      imports: [HttpClientTestingModule]
    });

    filesService = TestBed.inject(FilesService);
  });

  it('should be created', () => {
    expect(filesService).toBeDefined();
  });
});
