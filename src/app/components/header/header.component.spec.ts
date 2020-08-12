import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

describe('HeaderComponent', () => {
  let spectator: Spectator<HeaderComponent>;
  const createComponent = createComponentFactory({
    component: HeaderComponent,
    imports: [RouterTestingModule, NoopAnimationsModule, LayoutModule, MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule]
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create the header', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should render app title', () => {
    expect(spectator.query('h1').textContent).toBe('Hestia');
  });
});
