import { SnapshotTreeComponent } from './snapshot-tree.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { RouterTestingModule } from '@angular/router/testing';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';

describe('SnapshotTreeComponent', () => {
  let spectator: Spectator<SnapshotTreeComponent>;
  const createComponent = createComponentFactory({
    component: SnapshotTreeComponent,
    imports: [RouterTestingModule, MatTreeModule, MatIconModule]
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create the component', () => {
    expect(spectator.component).toBeTruthy();
  });
});
