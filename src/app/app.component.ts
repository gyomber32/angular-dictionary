import { Component, OnInit, OnChanges, Input } from '@angular/core';

import { DictionaryElement } from './dictionary.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges {
  title = 'dictionary';

  @Input() word: DictionaryElement[];
  @Input() translatedWords: string[];
  private englishWord: string;
  private hungarianWord: string;

  public addedWord(event): void {
    console.log(event);
    this.word = event;
  }

  public translatedWords(event): void {
    this.englishWord = event[0];
    this.hungarianWord = event[1];
  }

  ngOnChanges() {
    this.addedWord(event);
  }

  ngOnInit() {
    document.body.classList.add('bg-img');
  }
}
