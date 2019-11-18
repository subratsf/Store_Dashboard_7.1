import {MatDialogRef} from '@angular/material';
import {UploadService} from '../upload.service';
import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

    @ViewChild('file', {}) file;

    public files: Set<File> = new Set();

    progress;
    canBeClosed = true;
    primaryButtonText = 'Upload';
    showCancelButton = true;
    uploading = false;
    uploadSuccessful = false;

    constructor(public dialogRef: MatDialogRef<DialogComponent>, public uploadService: UploadService) {
    }

    ngOnInit() {
    }


    onFilesAdded() {
        const files: { [key: string]: File } = this.file.nativeElement.files;
        for (let key in files) {
            if (!isNaN(parseInt(key))) {
                this.files.add(files[key]);
            }
        }
    }

    addFiles() {
        this.file.nativeElement.click();
    }

    closeDialog() {
        // if everything was uploaded already, just close the dialog
        if (this.uploadSuccessful) {
            return this.dialogRef.close();
        }

        // set the component state to "uploading"
        this.uploading = true;

        // start the upload and save the progress map
        this.progress = this.uploadService.upload(this.files);
        console.log(this.progress);
        for (const key in this.progress) {
            this.progress[key].progress.subscribe(val => console.log(val));
        }

        // convert the progress map into an array
        const allProgressObservables = [];
        for (let key in this.progress) {
            allProgressObservables.push(this.progress[key].progress);
        }

        // Adjust the state variables

        // The OK-button should have the text "Finish" now
        this.primaryButtonText = 'Finish';
        this.canBeClosed = false;

        setTimeout(() => {
            this.dialogRef.close();
            window.location.reload();
        }, 3000);

    }
}
