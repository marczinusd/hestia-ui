import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { PageNotFoundComponent } from './page-not-found.component';

describe('PageNotFoundComponent', () => {
  let spectator: Spectator<PageNotFoundComponent>;
  const createComponent = createComponentFactory({
    component: PageNotFoundComponent,
    imports: []
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create component successfully', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should render span with text content 404', () => {
    expect(spectator.query('p')).toHaveText('404');
  });
});
