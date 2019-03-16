import { Component, ViewChild, OnInit, OnChanges, DoCheck, AfterViewInit, ChangeDetectorRef, Input } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef } from '@angular/material';
import { DictionaryService } from '../../services/dictionary.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../services/common.service';

@Component({
    selector: 'app-delete-dialog',
    templateUrl: 'delete-dialog.component.html',
    styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent {

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
                for (let i = 0; i < dictionary.length; i++) {
                    console.log('deleted2');
                    console.log(dictionary[i]);
                    if (dictionary[i].id === word.id) {
                        dictionary.splice(i, 1);
                        this.commonService.updateDictionary(dictionary);
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

}