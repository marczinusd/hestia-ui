import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

describe('HeaderComponent', () => {
  let spectator: Spectator<HeaderComponent>;
  const createComponent = createComponentFactory({
    component: HeaderComponent,
    imports: [RouterTestingModule]
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create the header', () => {
    expect(spectator.component).toBeTruthy();
  });
});
