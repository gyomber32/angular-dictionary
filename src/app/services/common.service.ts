import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { DictionaryElement } from '../dictionary.interface';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private dictionary = new BehaviorSubject<DictionaryElement[]>([]);

  constructor() { }

  cast = this.dictionary.asObservable();

  updateDictionary(newDictionray) {
    this.dictionary.next(newDictionray);
    console.log('word in service: ', this.dictionary.value);
  }

}
