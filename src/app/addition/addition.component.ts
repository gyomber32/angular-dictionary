import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addition',
  templateUrl: './addition.component.html',
  styleUrls: ['./addition.component.css']
})
export class AdditionComponent implements OnInit {

  private english: string;
  private hungarian: string;
  private partsOfSpeach: string;
  private synonym: string;
  private example: string;

  constructor() { }

  public addToDatabase(englsih: string, hungarian: string, partsOfSpeach: string, synonym?: string, example?: string): void {
    try {
      /* adding to database */
      alert("Successfully added to database.");
    } catch {
      /* catch the error */
      alert("Error during adding to database.");
    }
  }

  ngOnInit() {
  }

}
