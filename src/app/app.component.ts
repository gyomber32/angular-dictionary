import { Component, OnInit } from '@angular/core';

import { DictionaryElement } from './dictionary.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'dictionary';

  public word: DictionaryElement[];
  public englishWord: string;
  public hungarianWord: string;

  public addedWord(event): void {
    this.word = event;
  }

  public translatedWords(event): void {
    this.englishWord = event[0];
    this.hungarianWord = event[1];
  }

  ngOnInit() {
    document.body.classList.add('bg-img');
  }
}
