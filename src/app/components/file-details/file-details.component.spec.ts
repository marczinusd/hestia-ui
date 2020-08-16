import { FileDetailsComponent } from './file-details.component';
import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator/jest';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FileDetailsService } from '../../services/file-details.service';
import { TestScheduler } from 'rxjs/testing';
import { FileDetails } from '../../model/fileDetails';
import { LineDetails } from '../../model/lineDetails';
import { of, throwError } from 'rxjs';
import { FileHeader } from '../../model/fileHeader';

describe('FileDetailsComponent', () => {
  let spectator: Spectator<FileDetailsComponent>;
  const testScheduler: TestScheduler = new TestScheduler((actual, expected) => expect(actual).toStrictEqual(expected));
  const createComponent = createComponentFactory({
    component: FileDetailsComponent,
    imports: [MonacoEditorModule.forRoot(), FormsModule, MatProgressSpinnerModule],
    providers: [mockProvider(FileDetailsService)]
  });
  const fileDetails: FileDetails = new FileDetails(1, 'bla.ts', 2, 3, [new LineDetails('hello', 1, 3, true), new LineDetails('world', 2, 5, true)]);
  const fileHeader = new FileHeader('bla.ts', 1);

  beforeEach(() => (spectator = createComponent()));

  it('should create the component', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should hide loading spinner once loading is finished', () => {
    const service = spectator.inject<FileDetailsService>(FileDetailsService);
    testScheduler.run(({ cold }) => {
      jest.spyOn(service, 'getFileDetails').mockReturnValue(cold('-a|', { a: fileDetails }));
      spectator.component.header = of(fileHeader);
      spectator.component.ngOnInit();
      testScheduler.flush();
      spectator.detectComponentChanges();

      expect(spectator.query('.spinner-container')).toBeFalsy();
      expect(spectator.component.loading).toBeFalsy();
    });
  });

  it('should show loading spinner while file details query is in progress', () => {
    const service = spectator.inject<FileDetailsService>(FileDetailsService);
    testScheduler.run(({ cold }) => {
      jest.spyOn(service, 'getFileDetails').mockReturnValue(cold('-a|', { a: fileDetails }));
      spectator.component.header = of(fileHeader);
      spectator.component.ngOnInit();
      spectator.detectComponentChanges();

      expect(spectator.query('.spinner-container')).toBeTruthy();
      expect(spectator.component.loading).toBeTruthy();
    });
  });

  it('should select correct language mode for file extension', () => {
    const service = spectator.inject<FileDetailsService>(FileDetailsService);
    testScheduler.run(({ cold }) => {
      jest.spyOn(service, 'getFileDetails').mockReturnValue(cold('(a|)', { a: fileDetails }));
      spectator.component.header = of(new FileHeader('bla.ts', 1));
      spectator.component.ngOnInit();
      testScheduler.flush();

      expect(spectator.component.editorOptions.language).toBe('typescript');
    });
  });

  it('should render correct text based on line details returned', () => {
    const service = spectator.inject<FileDetailsService>(FileDetailsService);
    testScheduler.run(({ cold }) => {
      jest.spyOn(service, 'getFileDetails').mockReturnValue(cold('(a|)', { a: fileDetails }));
      spectator.component.header = of(fileHeader);
      spectator.component.ngOnInit();
      testScheduler.flush();

      expect(spectator.component.code).toBe('hello\nworld');
    });
  });

  it('should show error message if file details could not be loaded', () => {
    const service = spectator.inject<FileDetailsService>(FileDetailsService);
    testScheduler.run(() => {
      jest.spyOn(service, 'getFileDetails').mockReturnValue(throwError('oh no!'));
      spectator.component.header = of(fileHeader);
      spectator.component.ngOnInit();
      spectator.detectComponentChanges();

      expect(spectator.query('.load-failed-box')).toBeTruthy();
    });
  });

  it('should hide error message box if the ok button is pressed on error box', () => {
    const service = spectator.inject<FileDetailsService>(FileDetailsService);
    testScheduler.run(() => {
      jest.spyOn(service, 'getFileDetails').mockReturnValue(throwError('oh no!'));
      spectator.component.header = of(fileHeader);
      spectator.component.ngOnInit();
      spectator.component.hideError();
      spectator.detectComponentChanges();

      expect(spectator.query('.load-failed-box')).toBeFalsy();
    });
  });
});
