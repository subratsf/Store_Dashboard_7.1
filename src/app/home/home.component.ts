import {Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {SelectionModel} from '@angular/cdk/collections';
import {UploadService} from '../upload/upload.service';

export interface PeriodicElement {
  name: string;
  region: string;
  city: string;
  owner: string;
  province: string;
  square_feet: string;
  survey: SurveyElement;
}

export interface SurveyElement {
    total_sale: string;
    surveyresult: any;
}

export interface RetailActivity {
    Type: string;
    Activity_Date: string;
    Activity_Type: string;
    Status: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class HomeComponent implements OnInit {

  columnsToDisplay = ['name', 'region', 'city', 'owner', 'province', 'square_feet'];
  monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December' ];
  expandedElement: PeriodicElement | null;
  dataSource: MatTableDataSource<PeriodicElement>;
  selection = new SelectionModel<PeriodicElement>(true, []);
  storelist: PeriodicElement[] = [];
  list: PeriodicElement[] = [];
  noData = false;
  isLoadingResults = true;
  filter_text_for_activity = "Filter Store Activity";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( public uploadService: UploadService) {
    this.storelist = this.getStoreData();
    if ( this.storelist.length === 0 ) {
        this.noData = true;
    }
    this.isLoadingResults = false;
    this.dataSource = new MatTableDataSource(this.storelist);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
     this.dataSource.filter = filterValue.trim().toLowerCase();
     if (this.dataSource.paginator) {
       this.dataSource.paginator.firstPage();
     }
  }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: PeriodicElement): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name}`;
    }

    callresize() {
        // workaround to fix chart render
        this.uploadService.toggle();
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 1000);
    }

    getStoreData(): PeriodicElement[] {
        const storeDetails = JSON.parse(localStorage.getItem('Store'));
        const survey = JSON.parse(localStorage.getItem('Survey'));
        if ( storeDetails != null ) {
            storeDetails.forEach((element) => {
                let row = {
                    name: element.Name,
                    region: element.Region,
                    city: element.City,
                    province: element.Province,
                    owner: element.Owner,
                    square_feet: element.Square_Feet,
                    survey: this.getSalesData(element.Name),
                    retailActivity: this.getRetailActivity(element.Name),
                    retailData: this.getRetailData(element.Name)
                };
                this.list.push(row);
            });
        }
        return this.list;
    }

    getSalesData(name): SurveyElement {
        const surveys = JSON.parse(localStorage.getItem('Survey'));
        let result = new Map();
        let surveyByName = surveys.filter(
            survey => survey.Store_Name === name);
        if (surveyByName != null) {
            surveyByName.forEach((element) => {
                let month = this.monthNames[element.Month.split('/')[1]-1];
                if( !result.has(month) ){
                    result.set(month, []);
                }
                result.get(month).push({name: element.Result, value: parseFloat(element.Value)});
            })
        }
        let ret = [];
        result.forEach((val, key) => {
            ret.push({
                name: key,
                series: val
            });
        });
        return {
            total_sale: surveyByName[0].Sales,
            surveyresult: ret,
        }
    }

    getRetailActivity(name) {
        const groceryRetailActivities = JSON.parse(localStorage.getItem('GroceryRetailActivities'));
        let surveyByName = groceryRetailActivities.filter(
            survey => survey.Store_Name === name);
        let result = [];
        if (surveyByName != null) {
            surveyByName.forEach((element) => {
                let date = new Date(element.Activity_Date);
                result.push({
                    Type: element.Type,
                    Activity_Date: element.Activity_Date,
                    Activity_Type: element.Activity_Type,
                    Status: element.Status
                });
            })
        }
        return result;

    }

    getRetailData(name): any {
        const groceryRetailData = JSON.parse(localStorage.getItem('GroceryRetailData'));
        let result = new Map();
        let retailDataByName = groceryRetailData.filter(
            retailData => retailData.Store_Name === name);
        if (retailDataByName != null) {
            retailDataByName.forEach((element) => {
                if( !result.has(element.Product) ){
                    result.set(element.Product, []);
                }
                result.get(element.Product).push({name: element.Sales_Date, value: parseFloat(element.Sale)});
            })
        }
        let ret = [];
        result.forEach((val, key) => {
            ret.push({
                name: key,
                series: val
            });
        });
        return ret;
    }
}
