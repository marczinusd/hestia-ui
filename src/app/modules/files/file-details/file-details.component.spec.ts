import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { throwError } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { FileDetailsComponent } from './file-details.component';

import { FilesService } from '@modules/files/state/files.service';
import { API_BASE_URL } from '@shared/config/tokens';
import { mockFile } from '@shared/mocks/file.mock';
import { File } from '@shared/model/file';

describe('FileDetailsComponent', () => {
  let spectator: Spectator<FileDetailsComponent>;
  const jestExpect = (actual, expected) => expect(actual).toStrictEqual(expected);
  const createComponent = createComponentFactory({
    component: FileDetailsComponent,
    detectChanges: false,
    imports: [MonacoEditorModule.forRoot(), FormsModule, MatProgressSpinnerModule],
    providers: [{ provide: API_BASE_URL, useFactory: () => 'url' }],
    mocks: [HttpClient]
  });
  const file: File = mockFile;

  beforeEach(() => (spectator = createComponent()));

  it('should create the component', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should set showError flag to false when hideError is called', () => {
    spectator.component.hideError();

    expect(spectator.component.showError).toBeFalsy();
  });

  it('should hide the loading spinner once loading finishes', () => {
    const service = spectator.inject(FilesService);
    const http = spectator.inject(HttpClient);
    const testScheduler = new TestScheduler(jestExpect);

    testScheduler.run(({ cold }) => {
      http.get.andReturn(cold('-a|', { a: file }));
      spectator.component.ngOnInit();
      service.selectActive('1');
      testScheduler.flush();
      spectator.detectComponentChanges();

      expect(spectator.query('.spinner-container')).toBeFalsy();
      expect(spectator.component.loading).toBeFalsy();
    });
  });

  it('should show loading spinner while file details query is in progress', () => {
    const http = spectator.inject(HttpClient);
    const testScheduler = new TestScheduler(jestExpect);

    testScheduler.run(({ cold, expectObservable }) => {
      http.get.andReturn(cold('-a|', { a: file }));
      spectator.component.ngOnInit();
      spectator.detectComponentChanges();

      expect(spectator.query('.spinner-container')).toBeTruthy();
      expectObservable(spectator.component.isLoading$).toBe('a', { a: true });
    });
  });

  it('should select correct language mode for file extension', () => {
    const service = spectator.inject(FilesService);
    const http = spectator.inject(HttpClient);
    const testScheduler = new TestScheduler(jestExpect);

    testScheduler.run(({ cold }) => {
      http.get.andReturn(cold('(a|)', { a: file }));
      spectator.component.ngOnInit();
      service.selectActive('1');
      testScheduler.flush();

      expect(spectator.component.editorOptions.language).toBe('typescript');
    });
  });

  it('should render correct text based on the line details returned', () => {
    const service = spectator.inject(FilesService);
    const http = spectator.inject(HttpClient);
    const testScheduler = new TestScheduler(jestExpect);

    testScheduler.run(({ cold }) => {
      http.get.andReturn(cold('(a|)', { a: file }));
      spectator.component.ngOnInit();
      service.selectActive('1');
      testScheduler.flush();

      expect(spectator.component.code.split('\n')).toEqual(['hello    // HC: 0 DA: 2 CC: 3 ', 'world    // HC: 0 DA: 2 CC: 3 ']);
    });
  });

  it('should show error message if file details could not be loaded', () => {
    const service = spectator.inject(FilesService);
    const http = spectator.inject(HttpClient);
    const testScheduler = new TestScheduler(jestExpect);

    testScheduler.run(() => {
      http.get.andReturn(throwError('Oh no!'));
      spectator.component.ngOnInit();
      service.selectActive('1');
      spectator.detectComponentChanges();

      expect(spectator.query('.load-failed-box')).toBeTruthy();
    });
  });
});
