import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { TranslateService } from '../services/translate.service';

const config = new MatSnackBarConfig();
config.duration = 5000;

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent implements OnInit {

  private swap: boolean;
  public translateButtonDisabled = false;
  public hungarianWord: string;
  public englishWord: string;
  @Output() wordsEmitter = new EventEmitter<string[]>();

  constructor(private translateService: TranslateService, private snackBar: MatSnackBar) { }

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
      this.translateService.translate('en', 'hu', this.englishWord).subscribe((hungarianWord) => {
        this.hungarianWord = JSON.parse(hungarianWord).data;
        const translatedWords: Array<string> = [this.englishWord, this.hungarianWord];
        this.wordsEmitter.emit(translatedWords);
        this.translateButtonDisabled = false;
      }, (error) => {
        this.translateButtonDisabled = false;
        console.log(error);
        this.snackBar.open('The translation has failed!', 'Unsuccessful', config);
      });
    } else {
      this.translateButtonDisabled = true;
      this.translateService.translate('hu', 'en', this.hungarianWord).subscribe((englishWord) => {
        this.englishWord = JSON.parse(englishWord).data;
        const translatedWords: Array<string> = [this.englishWord, this.hungarianWord];
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
  }

}
