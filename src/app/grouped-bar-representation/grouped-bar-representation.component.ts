/*app.component.ts*/
import {Component, DoCheck, Input, OnInit} from '@angular/core';
import * as CanvasJS from './../assest/js/canvasjs.min';

@Component({
  selector: 'app-grouped-bar',
  templateUrl: './grouped-bar-representation.component.html'
})

export class GroupedBarRepresentationComponent implements OnInit {

  @Input() data?: any;
  @Input() chartInfo?: any;

  text: string;
  private pieChartInfo: any;
  view = [1300, 400];
  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = '';
  showYAxisLabel = true;
  barPadding = 10;
  yAxisLabel = 'Products';
  multi = [];
  timeline = true;
  colorScheme = {
    domain: ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080',
      '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000']
  };

  ngOnInit() {
    this.multi = this.data;
    this.xAxisLabel = 'Sell for different Dates!';
  }
}
