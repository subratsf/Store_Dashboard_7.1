import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RoutingModule} from './routing/routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule, MatPaginatorModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AppComponent } from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {HomeComponent} from './home/home.component';
import {PieRepresentationComponent} from './pie-representation/pie-representation.component';
import {GroupedBarRepresentationComponent} from './grouped-bar-representation/grouped-bar-representation.component';
import {UploadModule} from './upload/upload.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AppOverlayModule } from './overlay/overlay.module';
import { ProgressSpinnerModule } from './progress-spinner/progress-spinner.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { GridComponent } from './grid/grid.component';
import {MatIconModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PieRepresentationComponent,
    GroupedBarRepresentationComponent,
    GridComponent
  ],
  imports: [
    FlexLayoutModule,
    BrowserModule,
    RoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    UploadModule,
    AppOverlayModule,
    ProgressSpinnerModule,
    MatCheckboxModule,
    NgxChartsModule,
      MatIconModule,
      MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
