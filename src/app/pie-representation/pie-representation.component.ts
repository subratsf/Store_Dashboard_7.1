/*app.component.ts*/
import {Component, DoCheck, Input, OnInit} from '@angular/core';
import * as CanvasJS from './../assest/js/canvasjs.min';

@Component({
  selector: 'app-pie-representation',
  templateUrl: './pie-representation.component.html'
})

export class PieRepresentationComponent implements OnInit {

  @Input() survey?: any;
  @Input() chartInfo?: any;

  text: string;
  private pieChartInfo: any;
  view: any[] = [600, 400];
  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = '';
  showYAxisLabel = true;
  yAxisLabel = 'Trend(%)';
  multi = [];
  timeline = true;
  colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB']
  };

  ngOnInit() {
    this.multi = this.survey.surveyresult;
    this.xAxisLabel = 'Total Sale: ' + this.survey.total_sale;
  }
}
