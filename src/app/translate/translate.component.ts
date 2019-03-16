import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent implements OnInit {

  private swap: boolean;
  private hungarianWord: string;
  private englishWord: string;

  constructor() { }

  public swapLanguage(): void {
    if (this.swap === true) {
      this.swap = false;
    } else {
      this.swap = true;
    }
    console.log(this.swap);
  }

  public englishToHungarian(): void {

  }

  public hungarianToEnglish(): void {

  }

  public translate(): void {
    if (this.swap === true) {
      console.log('EnglishToHungarian');
    } else {
      console.log('HungarianToEnglish');
    }
  }

  ngOnInit() {
    this.swap = true;
  }

}
