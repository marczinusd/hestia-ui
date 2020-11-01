import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

type ParamsType = {
  data: File;
  clicked: (param) => string;
};

@Component({
  selector: 'app-button-cell-renderer',
  templateUrl: './button-cell-renderer.component.html',
  styleUrls: ['./button-cell-renderer.component.scss']
})
export class ButtonCellRendererComponent implements ICellRendererAngularComp {
  private params: ParamsType;

  agInit(params: unknown | ParamsType): void {
    this.params = params as ParamsType;
  }

  clicked(): void {
    this.params.clicked(this.params);
  }

  refresh(): boolean {
    return false;
  }
}
