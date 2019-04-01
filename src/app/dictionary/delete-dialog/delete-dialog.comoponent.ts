import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { CommonService } from '../../services/common.service';
import { DictionaryService } from '../../services/dictionary.service';

import { DictionaryElement } from '../../dictionary.interface';

const config = new MatSnackBarConfig();
config.duration = 5000;

@Component({
    selector: 'app-delete-dialog',
    templateUrl: 'delete-dialog.component.html',
    styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

    private dictionary: Array<DictionaryElement>;

    constructor(
        private dictionaryService: DictionaryService,
        private commonService: CommonService,
        private deleteDialogRef: MatDialogRef<DeleteDialogComponent>,
        private snackBar: MatSnackBar) { }

    public yes(): void {
        const id = Number(localStorage.getItem('delID'));
        this.dictionaryService.deleteWord(id).subscribe(_ => {
            for (let i = 0; i < this.dictionary.length; i++) {
                if (this.dictionary[i].id === id) {
                    this.dictionary.splice(i, 1);
                    this.commonService.updateDictionary(this.dictionary);
                    this.snackBar.open('The word has been deleted from database!', 'Successful', config);
                }
            }
        }, (error) => {
            console.log(error);
            this.snackBar.open('Error occurred during delete!', 'Unsuccessful', config);
        });
        this.deleteDialogRef.close();
    }

    public no(): void {
        this.deleteDialogRef.close();
    }

    public onNoClick(): void {
        this.deleteDialogRef.close();
    }

    ngOnInit() {
        this.commonService.cast.subscribe((dictionary) => {
            this.dictionary = dictionary;
        }, (error) => {
            console.log(error);
        });
    }

}

