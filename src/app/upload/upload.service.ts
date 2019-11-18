import {EventEmitter, Injectable, Output} from '@angular/core';
import {Subject, Observable} from 'rxjs';
import {OverlayTogglerService} from '../util/overlay-toggler.service';

@Injectable()
export class UploadService {
    isOpen = false;
    @Output() show: EventEmitter<boolean> = new EventEmitter();
    store_details: Array<string> = ['Name', 'Region', 'City', 'Province', 'Square Feet', 'Owner'];

    constructor() {
    }

    public upload(
        files: Set<File>
    ): { [key: string]: { progress: Observable<number> } } {
        // this will be the our resulting map
        const status: { [key: string]: { progress: Observable<number> } } = {};

        files.forEach(file => {
            // create a new multipart-form for every file
            const formData: FormData = new FormData();
            formData.append('file', file, file.name);

            // create a new progress-subject for every file
            const progress = new Subject<number>();

            const fileKey = file.name.split('.');
            if (fileKey[0].toLowerCase() === 'survey') {
                this.convertFile(file, this.store_details);
            }

            const data = this.convertFile(file);

            progress.complete();
            // Save every progress-observable in a map of all observables
            status[file.name] = {
                progress: progress.asObservable()
            };
        });

        // return the map of progress.observables
        return status;
    }


    toggle() {
        this.isOpen = !this.isOpen;
        this.show.emit(this.isOpen);
    }

    convertFile = (file, header?) => {
        const reader = new FileReader();
        reader.onload = () => {
            const text = reader.result;
            // console.log('CSV: ', text.substring(0, 100) + '...');

            const json = this.csvJSON(text, header);

            const fileKey = file.name.split('.');
            if (header != null) {
                const result = [];
                const map = new Map();
                for (const item of json) {
                    if (!map.has(item.Name)) {
                        map.set(item.Name, true);
                        result.push(item);
                    }// set any value to Ma
                }
                localStorage.setItem('Store', JSON.stringify(result));
                console.log('Store' + json);
            } else {
                localStorage.setItem(fileKey[0], JSON.stringify(json));
                console.log(fileKey[0] + '    ' + JSON.stringify(json));
            }
            this.toggle();
        };
        reader.readAsText(file, header);
    };

    public csvJSON(csv, header?) {
        const lines = csv.split('\n');
        const result = [];

        const headers = header == null ? lines[0].split(',') : header;

        for (let i = 1; i < lines.length; i++) {
            const obj = {};
            const currentline = lines[i].split(',');

            for (let j = 0; j < headers.length; j++) {
                const title = headers[j].trim().replace('\"', '').replace(' ', '_');
                if (header != null) {
                    obj[title] = currentline[j];
                } else {
                    if (this.store_details.indexOf(headers[j]) === -1 || title === 'name') {
                        obj[title] = currentline[j];
                    }
                }
            }
            result.push(obj);
        }
        // return result; //JavaScript object
        return result; // JSON
    }
}
