import {Component, OnInit} from '@angular/core';
import {UploadService} from './upload/upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
      private uploadService: UploadService
  ) { }

  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  displayProgressSpinner = false;

  ngOnInit() {
    this.uploadService.show.subscribe(isOpen => {
      if (isOpen) {
        this.showProgressSpinner();
      }
    });
  }
  // Display progress spinner for 3 secs on click of button
  showProgressSpinner = () => {
    this.displayProgressSpinner = true;
    setTimeout(() => {
      this.displayProgressSpinner = false;
    }, 3500);
  }
}
