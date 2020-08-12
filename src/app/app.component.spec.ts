import { RouterTestingModule } from '@angular/router/testing';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory({
    component: AppComponent,
    imports: [RouterTestingModule, MatToolbarModule],
    declarations: [HeaderComponent]
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create the app', () => {
    expect(spectator.component).toBeTruthy();
  });

  it(`should have as title 'hestia-ui'`, () => {
    expect(spectator.component.title).toEqual('hestia-ui');
  });

  it('should render title', () => {
    expect(spectator.query('.content span').textContent).toContain('hestia-ui app is running!');
  });

  it('should render the header', () => {
    expect(spectator.query('.main-navbar')).toBeTruthy();
  });
});
