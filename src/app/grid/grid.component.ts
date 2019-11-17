import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

export interface RetailActivity {
    Type: string;
    Activity_Date: string;
    Activity_Type: string;
    Status: string;
}

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
    @Input() activity?: RetailActivity[];
    @Input() columnsToDisplay?: any[];
    @Input() filterText?: string[];

  dataSource: MatTableDataSource<RetailActivity>;
  selection = new SelectionModel<RetailActivity>(true, []);
  storelist: RetailActivity[] = [];
  noData = false;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
  }

  ngOnInit() {
    this.storelist = this.activity;
      if ( this.storelist.length === 0 ) {
          this.noData = true;
      }
      this.isLoadingResults = false;
      this.dataSource = new MatTableDataSource(this.storelist);
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
    checkboxLabel(row?: any): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name}`;
    }
}
