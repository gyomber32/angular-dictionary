import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { DictionaryService } from '../../../services/dictionary.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { CommonService } from '../../../services/common.service';

import { DictionaryElement } from '../../../dictionary.interface';

const config = new MatSnackBarConfig();
config.duration = 5000;

@Component({
    selector: 'app-modify-dialog',
    templateUrl: 'modify-dialog.component.html',
    styleUrls: ['./modify-dialog.component.css']
})
export class ModifyDialogComponent implements OnInit {

    public modifyForm: FormGroup;
    private dictionary: DictionaryElement[] = [];

    constructor(
        private dictionaryService: DictionaryService,
        private commonService: CommonService,
        private formBuilder: FormBuilder,
        private modifyDialogRef: MatDialogRef<ModifyDialogComponent>,
        private snackBar: MatSnackBar) { }

    get formData() { return <FormArray>this.modifyForm.get('details'); }

    public formValidator() {
        this.modifyForm = this.formBuilder.group({
            english: ['', Validators.required],
            details: this.formBuilder.array([
                this.addDetailsFormGroup()
            ])
        });
    }

    public getOneWord(): void {
        const id = localStorage.getItem('modID');
        this.dictionaryService.getOneWord(id).subscribe((word: any) => {
            this.modifyForm.get('english').setValue(word.data.english);
            word.data.details.forEach((detail, i) => {
                const controlArray = <FormArray>this.modifyForm.get('details');
                if (i === 0) {
                    controlArray.controls[i].get('hungarian').setValue(detail.hungarian);
                    controlArray.controls[i].get('partsOfSpeech').setValue(detail.partsOfSpeech);
                    controlArray.controls[i].get('synonym').setValue(detail.synonym);
                    controlArray.controls[i].get('example').setValue(detail.example);
                } else {
                    this.addDetails();
                    controlArray.controls[i].get('hungarian').setValue(detail.hungarian);
                    controlArray.controls[i].get('partsOfSpeech').setValue(detail.partsOfSpeech);
                    controlArray.controls[i].get('synonym').setValue(detail.synonym);
                    controlArray.controls[i].get('example').setValue(detail.example);
                }
            });
        }, (error) => {
            console.log(error);
        });
    }

    public onSubmit() {
        // stop here if form is invalid
        if (this.modifyForm.invalid) {
            return;
        } else {
            const id = localStorage.getItem('modID');
            const english = this.modifyForm.get('english').value;
            const details = this.modifyForm.get('details').value;
            this.dictionaryService.modifyWord(id, english, details).subscribe((result) => {
                const word = result.data;
                for (let i = 0; i < this.dictionary.length; i++) {
                    if (this.dictionary[i]._id === id) {
                        this.dictionary[i] = word;
                        this.commonService.updateDictionary(this.dictionary);
                        this.snackBar.open('The word has been modified in the database!', 'Successful', config);
                    }
                }
            }, (error) => {
                console.log(error);
                this.snackBar.open('Error occurred during modify!', 'Unsuccessful', config);
            });
            this.modifyDialogRef.close();
        }
    }

    addDetailsFormGroup(): FormGroup {
        return this.formBuilder.group({
            hungarian: ['', Validators.required],
            partsOfSpeech: ['', Validators.required],
            synonym: [''],
            example: ['', Validators.maxLength(128)]
        });
    }

    addDetails(): void {
        (<FormArray>this.modifyForm.get('details')).push(this.addDetailsFormGroup());
    }

    removeDetails() {
        const detailsArrayLength = (<FormArray>this.modifyForm.get('details')).length;
        if (detailsArrayLength > 1) {
            (<FormArray>this.modifyForm.get('details')).removeAt(detailsArrayLength - 1);
        }
    }

    public onNoClick(): void {
        this.modifyDialogRef.close();
    }

    ngOnInit() {
        this.formValidator();
        this.getOneWord();
        this.commonService.cast.subscribe((dictionary) => {
            this.dictionary = dictionary;
        }, (error) => {
            console.log(error);
        });
    }

}

