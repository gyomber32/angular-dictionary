import { Component, OnInit, OnChanges, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { DictionaryService } from '../services/dictionary.service';
import { CommonService } from '../services/common.service';

import { DictionaryElement } from '../dictionary.interface';

const config = new MatSnackBarConfig();
config.duration = 5000;

@Component({
  selector: 'app-addition',
  templateUrl: './addition.component.html',
  styleUrls: ['./addition.component.css']
})
export class AdditionComponent implements OnInit, OnChanges {

  private additionForm: FormGroup;
  private dictionary: DictionaryElement[] = [];
  @Output() wordEmitter = new EventEmitter<DictionaryElement>();
  @Input() englishWord = '';
  @Input() hungarianWord = '';

  constructor(
    private dictionaryService: DictionaryService,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar) { }

  public formValidator() {
    this.additionForm = this.formBuilder.group({
      english: ['', Validators.required],
      details: this.formBuilder.array([
        this.addDetailsFormGroup()
      ])
    });
  }

  public async addToDatabase(english: string, details: []) {
    try {
      await this.commonService.cast.subscribe((dictionary) => {
        this.dictionary = [];
        this.dictionary = dictionary;
      }, (error) => {
        console.log(error);
      });
      await this.dictionaryService.addWord(english, details).subscribe((result: any) => {
        const word = result.data;
        this.dictionary.push(word);
        this.wordEmitter.emit(word);
        this.commonService.updateDictionary(this.dictionary);
        this.additionForm.reset();
        this.snackBar.open('Successfully added to database!', 'Successful', config);
      }, (error) => {
        console.log(error);
        this.snackBar.open('Error during adding to database!', 'Unsuccessful', config);
      });
    } catch (error) {
      console.log(error);
      this.snackBar.open('Error during adding to database!', 'Unsuccessful', config);
    }
  }

  onSubmit() {
    // stops here if form is invalid
    if (this.additionForm.invalid) {
      return;
    } else {
      const english = this.additionForm.get('english').value;
      const details = this.additionForm.get('details').value;
      this.addToDatabase(english, details);
    }
  }

  addDetailsFormGroup(): FormGroup {
    return this.formBuilder.group({
      hungarian: ['', Validators.required],
      partsOfSpeech: ['', Validators.required],
      synonym: [''],
      example: ['']
    });
  }

  addDetails(): void {
    (<FormArray>this.additionForm.get('details')).push(this.addDetailsFormGroup());
  }

  removeDetails() {
    const detailsArrayLength = (<FormArray>this.additionForm.get('details')).length;
    if (detailsArrayLength > 1) {
      (<FormArray>this.additionForm.get('details')).removeAt(detailsArrayLength - 1);
    }
  }

  ngOnChanges() {
    if (this.englishWord !== undefined && this.hungarianWord !== undefined) {
      this.additionForm.get('english').setValue(this.englishWord);
      const controlArray = <FormArray>this.additionForm.get('details');
      controlArray.controls[0].get('hungarian').setValue(this.hungarianWord);
      controlArray.controls[0].get('partsOfSpeech').setValue('');
      controlArray.controls[0].get('synonym').setValue('');
      controlArray.controls[0].get('example').setValue('');
    }
  }

  ngOnInit() {
    this.formValidator();
    this.commonService.cast.subscribe((dictionary) => {
      this.dictionary = [];
      this.dictionary = dictionary;
    }, (error) => {
      console.log(error);
    });
  }

}
