import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { ButtonCellRendererComponent } from './button-cell-renderer.component';

describe('ButtonCellRendererComponent', () => {
  let spectator: Spectator<ButtonCellRendererComponent>;
  const createComponent = createComponentFactory({
    component: ButtonCellRendererComponent,
    imports: []
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
