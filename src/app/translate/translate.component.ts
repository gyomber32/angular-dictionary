import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { TranslateService } from '../services/translate.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

const config = new MatSnackBarConfig();
config.duration = 5000;

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent implements OnInit {

  private engToHunForm: FormGroup;
  private hunToEngForm: FormGroup;
  public swap: boolean;
  public translateButtonDisabled = false;
  @Output() wordsEmitter = new EventEmitter<string[]>();

  constructor(
    private formBuilder: FormBuilder,
    private translateService: TranslateService,
    private snackBar: MatSnackBar) { }

  public formValidator() {
    this.engToHunForm = this.formBuilder.group({
      english: ['', Validators.required],
      hungarian: ['']
    });
    this.hunToEngForm = this.formBuilder.group({
      english: [''],
      hungarian: ['', Validators.required]
    });
  }

  public swapLanguage(): void {
    if (this.swap === true) {
      this.swap = false;
    } else {
      this.swap = true;
    }
  }

  public translate(): void {
    if (this.swap === true) {
      this.translateButtonDisabled = true;
      const englishWord = this.engToHunForm.get('english').value;
      this.translateService.translate('en', 'hu', englishWord).subscribe((hungarian) => {
        const hungarianWord = JSON.parse(hungarian).data;
        this.engToHunForm.get('hungarian').setValue(hungarianWord);
        const translatedWords: Array<string> = [englishWord, hungarianWord];
        this.wordsEmitter.emit(translatedWords);
        this.translateButtonDisabled = false;
      }, (error) => {
        this.translateButtonDisabled = false;
        console.log(error);
        this.snackBar.open('The translation has failed!', 'Unsuccessful', config);
      });
    } else {
      this.translateButtonDisabled = true;
      const hungarianWord = this.hunToEngForm.get('hungarian').value;
      this.translateService.translate('hu', 'en', hungarianWord).subscribe((english) => {
        const englishWord = JSON.parse(english).data;
        this.hunToEngForm.get('english').setValue(englishWord);
        const translatedWords: Array<string> = [englishWord, hungarianWord];
        this.wordsEmitter.emit(translatedWords);
        this.translateButtonDisabled = false;
      }, (error) => {
        this.translateButtonDisabled = false;
        console.log(error);
        this.snackBar.open('The translation has failed!', 'Unsuccessful', config);
      });
    }
  }

  ngOnInit() {
    this.swap = true;
    this.formValidator();
  }

}
