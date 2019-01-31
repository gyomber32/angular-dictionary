import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DictionaryApi } from '../sdk/services/custom/Dictionary';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  constructor(private dictionaryApi: DictionaryApi) { }

  public addWord(english: string, hungarian: string, partsOfSpeech: string, synonym?: string, example?: string): Observable<any> {
    return this.dictionaryApi.addWord(english, hungarian, partsOfSpeech, synonym, example);
  }

  public getAllWords(): Observable<any> {
    return this.dictionaryApi.getAllWords();
  }

  public getOneWord(id: number): Observable<any> {
    return this.getOneWord(id);
  }

  public checkWord(english: string): Observable<any> {
    return this.dictionaryApi.checkWord(english);
  }

  public modifyWord(id: string, english: string, hungarian: string, partsOfSpeech: string, synonym?: string, example?: string): Observable<any> {
    return this.dictionaryApi.modifyWord(id, english, hungarian, partsOfSpeech, synonym, example);
  }

  public deleteWord(id: string): Observable<any> {
    return this.dictionaryApi.deleteWord(id);
  }

}
