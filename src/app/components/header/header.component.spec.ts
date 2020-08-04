import { HeaderComponent } from './header.component';
import { MenubarModule } from 'primeng/menubar';
import { RouterTestingModule } from '@angular/router/testing';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

describe('HeaderComponent', () => {
  let spectator: Spectator<HeaderComponent>;
  const createComponent = createComponentFactory({
    component: HeaderComponent,
    imports: [RouterTestingModule, MenubarModule]
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create the header', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should contain File menu item', () => {
    expect(spectator.component.items.find((item) => item.label === 'File'))
      .toBeTruthy;
  });

  it('should contain Edit menu item', () => {
    expect(spectator.component.items.find((item) => item.label === 'Edit'))
      .toBeTruthy;
  });
});
