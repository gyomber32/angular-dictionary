import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3200/translate/';
const engToHun = 'sl=en&tl=hu&word=';
const hunToEng = 'sl=hu&tl=en&word=';

@Injectable({
    providedIn: 'root'
})
export class TranslateService {

    constructor(private http: HttpClient) { }

    public englishToHungarian(word: string): Observable<any> {
        const url = baseUrl + engToHun + word;
        return this.http.get(url, { responseType: 'text' });
    }

    public hungarianToEnglish(word: string): Observable<any> {
        const url = baseUrl + hunToEng + word;
        return this.http.get(url, { responseType: 'text' });
    }

}

