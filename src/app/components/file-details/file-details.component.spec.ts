import { FileDetailsComponent } from './file-details.component';
import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator/jest';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FileDetailsService } from '../../services/file-details.service';
import { TestScheduler } from 'rxjs/testing';
import { File } from '../../model/file';
import { throwError } from 'rxjs';
import { Line } from '../../model/line';
import { SelectionService } from '../../services/selection.service';

describe('FileDetailsComponent', () => {
  let spectator: Spectator<FileDetailsComponent>;
  const jestExpect = (actual, expected) => expect(actual).toStrictEqual(expected);
  const createComponent = createComponentFactory({
    component: FileDetailsComponent,
    detectChanges: false,
    imports: [MonacoEditorModule.forRoot(), FormsModule, MatProgressSpinnerModule],
    providers: [mockProvider(FileDetailsService)]
  });
  const lines: Line[] = [
    { content: 'hello', lineNumber: 1, numberOfAuthors: 2, numberOfChanges: 3, isCovered: true },
    { content: 'world', lineNumber: 2, numberOfAuthors: 2, numberOfChanges: 3, isCovered: true }
  ];
  const file: File = { lines, path: 'bla.ts', lifetimeAuthors: 2, lifetimeChanges: 3, coveragePercentage: 50, id: '1' };

  beforeEach(() => (spectator = createComponent()));

  it('should create the component', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should hide the loading spinner once loading finishes', () => {
    const service = spectator.inject<FileDetailsService>(FileDetailsService);
    const testScheduler = new TestScheduler(jestExpect);
    const selection = spectator.inject(SelectionService);

    testScheduler.run(({ cold }) => {
      jest.spyOn(service, 'getFileDetails').mockReturnValue(cold('-a|', { a: file }));
      spectator.component.ngOnInit();
      selection.selectFile('1');
      testScheduler.flush();
      spectator.detectComponentChanges();

      expect(spectator.query('.spinner-container')).toBeFalsy();
      expect(spectator.component.loading).toBeFalsy();
    });
  });

  it('should show loading spinner while file details query is in progress', () => {
    const service = spectator.inject<FileDetailsService>(FileDetailsService);
    const testScheduler = new TestScheduler(jestExpect);

    testScheduler.run(({ cold }) => {
      jest.spyOn(service, 'getFileDetails').mockReturnValue(cold('-a|', { a: file }));
      spectator.component.ngOnInit();
      spectator.detectComponentChanges();

      expect(spectator.query('.spinner-container')).toBeTruthy();
      expect(spectator.component.loading).toBeTruthy();
    });
  });

  it('should select correct language mode for file extension', () => {
    const service = spectator.inject<FileDetailsService>(FileDetailsService);
    const testScheduler = new TestScheduler(jestExpect);
    const selection = spectator.inject(SelectionService);

    testScheduler.run(({ cold }) => {
      jest.spyOn(service, 'getFileDetails').mockReturnValue(cold('(a|)', { a: file }));
      spectator.component.ngOnInit();
      selection.selectFile('1');
      testScheduler.flush();

      expect(spectator.component.editorOptions.language).toBe('typescript');
    });
  });

  it('should render correct text based on the line details returned', () => {
    const service = spectator.inject<FileDetailsService>(FileDetailsService);
    const testScheduler = new TestScheduler(jestExpect);
    const selection = spectator.inject(SelectionService);

    testScheduler.run(({ cold }) => {
      jest.spyOn(service, 'getFileDetails').mockReturnValue(cold('(a|)', { a: file }));
      spectator.component.ngOnInit();
      selection.selectFile('1');
      testScheduler.flush();

      expect(spectator.component.code).toBe('hello\nworld');
    });
  });

  it('should show error message if file details could not be loaded', () => {
    const service = spectator.inject<FileDetailsService>(FileDetailsService);
    const testScheduler = new TestScheduler(jestExpect);
    const selection = spectator.inject(SelectionService);

    testScheduler.run(() => {
      jest.spyOn(service, 'getFileDetails').mockReturnValue(throwError('Oh no!'));
      spectator.component.ngOnInit();
      selection.selectFile('1');
      spectator.detectComponentChanges();

      expect(spectator.query('.load-failed-box')).toBeTruthy();
    });
  });

  it('should hide error message box if upon pressing the OK button in the error box', () => {
    const service = spectator.inject<FileDetailsService>(FileDetailsService);
    const testScheduler = new TestScheduler(jestExpect);

    testScheduler.run(() => {
      jest.spyOn(service, 'getFileDetails').mockReturnValue(throwError('Oh no!'));
      spectator.component.ngOnInit();
      spectator.component.hideError();
      spectator.detectComponentChanges();

      expect(spectator.query('.load-failed-box')).toBeFalsy();
    });
  });
});
