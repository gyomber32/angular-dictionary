import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { TranslateService } from '../services/translate.service';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent implements OnInit {

  private translateButtonDisabled = false;
  private swap: boolean;
  private hungarianWord: string;
  private englishWord: string;
  @Output() wordsEmitter = new EventEmitter<string[]>();

  constructor(private translateService: TranslateService) { }

  public swapLanguage(): void {
    if (this.swap === true) {
      this.swap = false;
    } else {
      this.swap = true;
    }
  }

  public englishToHungarian(word: string): void {
    this.translateButtonDisabled = true;
    this.translateService.englishToHungarian(word).subscribe((hungarianWord) => {
      this.hungarianWord = hungarianWord;
      const translatedWords: Array<string> = [this.englishWord, this.hungarianWord];
      this.wordsEmitter.emit(translatedWords);
      this.translateButtonDisabled = false;
    }, (error) => {
      this.translateButtonDisabled = false;
      console.log(error);
    });
  }

  public hungarianToEnglish(word: string): void {
    this.translateButtonDisabled = true;
    this.translateService.hungarianToEnglish(word).subscribe((englishWord) => {
      this.englishWord = englishWord;
      const translatedWords: Array<string> = [this.englishWord, this.hungarianWord];
      this.wordsEmitter.emit(translatedWords);
      this.translateButtonDisabled = false;
    }, (error) => {
      this.translateButtonDisabled = false;
      console.log(error);
    });
  }

  public translate(): void {
    if (this.swap === true) {
      this.englishToHungarian(this.englishWord);
    } else {
      this.hungarianToEnglish(this.hungarianWord);
    }
  }

  ngOnInit() {
    this.swap = true;
  }

}
