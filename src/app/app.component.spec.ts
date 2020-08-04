import { RouterTestingModule } from '@angular/router/testing';
import { MenubarModule } from 'primeng/menubar';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory({
    component: AppComponent,
    imports: [RouterTestingModule, MenubarModule]
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create the app', () => {
    expect(spectator.component).toBeTruthy();
  });

  it(`should have as title 'hestia-ui'`, () => {
    expect(spectator.component.title).toEqual('hestia-ui');
  });

  it('should render title', () => {
    expect(spectator.query('.content span').textContent).toContain(
      'hestia-ui app is running!'
    );
  });
});
