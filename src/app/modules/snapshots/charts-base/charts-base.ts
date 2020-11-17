import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

export class ChartsBase {
  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'bar';
  public lineChartPlugins = [];
  public lineChartOptions: ChartOptions = {};

  protected hideXAxis(): void {
    this.lineChartOptions = {
      scales: {
        xAxes: [
          {
            display: false
          }
        ]
      }
    };
  }
}
