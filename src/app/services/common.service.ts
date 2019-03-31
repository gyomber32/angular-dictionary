import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { DictionaryElement } from '../dictionary.interface';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private dictionary = new BehaviorSubject<DictionaryElement[]>([]);
  private emittDictionary = new EventEmitter<any>();

  constructor() { }

  cast = this.dictionary.asObservable();

  updateDictionary(newDictionray) {
    this.dictionary.next(newDictionray);
  }

}
