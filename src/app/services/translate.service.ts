import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3000/translate/';

@Injectable({
    providedIn: 'root'
})
export class TranslateService {

    constructor(private http: HttpClient) { }

    public translate(sourceLanguage: string, targetLanguage: string, word: string): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        });
        const url = `${baseUrl}sl=${sourceLanguage}&tl=${targetLanguage}&word=${word}`;
        return this.http.get(url, { headers, responseType: 'text' });
    }

}
