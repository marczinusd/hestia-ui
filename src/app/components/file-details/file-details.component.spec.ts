import { FileDetailsComponent } from './file-details.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { FormsModule } from '@angular/forms';

describe('FileDetailsComponent', () => {
  let spectator: Spectator<FileDetailsComponent>;
  const createComponent = createComponentFactory({
    component: FileDetailsComponent,
    imports: [MonacoEditorModule.forRoot(), FormsModule]
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create the component', () => {
    expect(spectator.component).toBeTruthy();
  });
});
