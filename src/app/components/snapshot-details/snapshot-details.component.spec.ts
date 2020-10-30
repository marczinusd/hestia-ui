import { SnapshotDetailsComponent } from './snapshot-details.component';
import { createRoutingFactory, mockProvider, SpectatorRouting } from '@ngneat/spectator/jest';
import { MatTabsModule } from '@angular/material/tabs';
import { SnapshotStatisticsComponent } from '../snapshot-statistics/snapshot-statistics.component';
import { MockComponent } from 'ng-mocks';
import { FileDetailsComponent } from '../file-details/file-details.component';
import { SelectionService } from '../../services/selection.service';
import { of } from 'rxjs';

describe('SnapshotDetailsComponent', () => {
  let spectator: SpectatorRouting<SnapshotDetailsComponent>;
  const createComponent = createRoutingFactory({
    component: SnapshotDetailsComponent,
    providers: [
      mockProvider(SelectionService, {
        selectedFileId: of('1')
      })
    ],
    declarations: [MockComponent(SnapshotStatisticsComponent), MockComponent(FileDetailsComponent)],
    imports: [MatTabsModule],
    params: { id: '4' }
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create component successfully', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should switch tabs if file selection changed', () => {
    spectator.component.ngOnInit();

    expect(spectator.component.selectedIndex).toBe(2);
  });
});
