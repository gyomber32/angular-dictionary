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

  addedWord(event) {
    console.log(event);
    this.word = event;
  }

  ngOnChanges() {
    this.addedWord(event);
  }

  ngOnInit() {
    document.body.classList.add('bg-img');
  }
}
