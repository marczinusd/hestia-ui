import { LayoutModule } from '@angular/cdk/layout';
import { Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { createRoutingFactory, Spectator } from '@ngneat/spectator/jest';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let spectator: Spectator<HeaderComponent>;
  const createComponent = createRoutingFactory({
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

  it('should invoke correct route', async () => {
    await spectator.component.navigateHome();
    await spectator.fixture.whenStable();

    expect(spectator.inject(Location).path()).toBe('');
  });
});
