import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  constructor(private http: HttpClient) { }

  public addWord(english: string, details: []): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    const body = {
      word: english,
      details: details
    };
    return this.http.post('http://localhost:3000/dictionary/word', body, { headers });
  }

  public getAllWords(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get('http://localhost:3000/dictionary/word', { headers });
  }

  public getOneWord(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`http://localhost:3000/dictionary/word/${id}`, { headers });
  }

  public modifyWord(id: string, english: string, details: []): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    const body = {
      word: english,
      details: details
    };
    return this.http.put(`http://localhost:3000/dictionary/word/${id}`, body, { headers });
  }

  public deleteWord(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    console.log(id);
    return this.http.delete(`http://localhost:3000/dictionary/word/${id}`, { headers });
  }

}
