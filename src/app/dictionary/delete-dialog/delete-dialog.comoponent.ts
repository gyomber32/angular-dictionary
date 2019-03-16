import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { CommonService } from '../../services/common.service';
import { DictionaryService } from '../../services/dictionary.service';

import { DictionaryElement } from '../../dictionary.interface';

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
        private deleteDialogRef: MatDialogRef<DeleteDialogComponent>) { }

    public yes(): void {
        const id = Number(localStorage.getItem('delID'));
        this.dictionaryService.deleteWord(id).subscribe(_ => {
            console.log('deleted1');
            // alert('The word has been deleted!');
            this.commonService.cast.subscribe((word) => {
                console.log('word: ', word);
                for (let i = 0; i < this.dictionary.length; i++) {
                    console.log('deleted2');
                    // console.log(this.dictionary[i]);
                    if (this.dictionary[i].id === id) {
                        this.dictionary.splice(i, 1);
                        console.log('word: ', this.dictionary);
                        this.commonService.updateDictionary(this.dictionary);
                        console.log('deleted3');
                    }
                }
            });
        }, (error) => {
            console.log(error);
            alert('Error occurred during delete!');
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
        console.log('onInit in deleteDialog');
        this.commonService.cast.subscribe((dictionary) => {
            this.dictionary = dictionary;
        }, (error) => {
            console.log(error);
        });
    }

}

