import { Component, OnInit } from '@angular/core';

import { DictionaryElement } from '../dictionary.interface';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  public word: DictionaryElement[];
  public englishWord: string;
  public hungarianWord: string;

  constructor(private authService: AuthService) { }

  public addedWord(event): void {
    this.word = event;
  }

  public translatedWords(event): void {
    this.englishWord = event[0];
    this.hungarianWord = event[1];
  }

  public logout(): void {
    this.authService.logout();
  }

  ngOnInit() {
    document.body.classList.add('bg-img');
  }

}

