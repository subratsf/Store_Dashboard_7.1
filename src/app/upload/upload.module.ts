import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload.component';
import {MatDialogModule, MatProgressBarModule } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UploadService } from './upload.service';
import { OverlayTogglerService} from '../util/overlay-toggler.service';
import { HttpClientModule } from '@angular/common/http';
import {
  MatButtonModule, MatIconModule, MatListModule
} from '@angular/material';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatIconModule, MatListModule, HttpClientModule, BrowserAnimationsModule, MatProgressBarModule],
  declarations: [UploadComponent, DialogComponent],
  exports: [UploadComponent],
  entryComponents: [DialogComponent], // Add the DialogComponent as entry component
  providers: [UploadService, OverlayTogglerService]
})
export class UploadModule {}
