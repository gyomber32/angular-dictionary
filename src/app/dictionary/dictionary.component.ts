import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent implements OnInit {

  private displayedColumns: string[] = ['id', 'english', 'hungarian', 'partsOfSpeech', 'synonym', 'example', 'select'];
  private dataSource = new MatTableDataSource(dictionary);

  constructor() { }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatSort) sort: MatSort;

  public modify(): void {

  }

  public delete(): void {

  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

}

export interface DictionaryElement {
  id: number,
  english: string;
  hungarian: string;
  partsOfSpeech: string;
  synonym?: string;
  example?: string;
}

const dictionary: DictionaryElement[] = [
  { id: 1, english: 'courage', hungarian: 'bátorság', partsOfSpeech: 'noun', synonym: 'bravery, boldness', example: 'He fought his illness with great courage.' },
  { id: 2, english: 'grab', hungarian: 'megragad', partsOfSpeech: 'verb', synonym: 'grip, snatch, seize, tackle, grapple', example: 'It was only the quick grab of one of his porters that saves him from the fall.' },
  { id: 3, english: 'soldier', hungarian: 'katona', partsOfSpeech: 'noun', synonym: 'man, serviceman', example: 'As an enlisted soldier , he served in every leadership position up to the position of First Sergeant.' },
  { id: 4, english: 'lonely', hungarian: 'magányos', partsOfSpeech: 'adjective', synonym: 'lonely, lone, solitary, lonesome, desolate, segregate', example: "I don\'t want you to be lonely for the rest of your life." }
];
