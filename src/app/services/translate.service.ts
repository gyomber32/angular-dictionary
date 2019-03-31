import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TranslateService {

    constructor(private http: HttpClient) { }

    public englishToHungarian(): Observable<string> {
        // return this.http.get('');
        return null;
    }

}

