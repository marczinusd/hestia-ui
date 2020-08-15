import { FileDetailsComponent } from './file-details.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

describe('FileDetailsComponent', () => {
  let spectator: Spectator<FileDetailsComponent>;
  const createComponent = createComponentFactory({
    component: FileDetailsComponent
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create the component', () => {
    expect(spectator.component).toBeTruthy();
  });
});
