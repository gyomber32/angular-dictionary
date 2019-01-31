import { Component, OnInit, OnChanges, ViewChild, Input } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatTableDataSource } from '@angular/material';
import { DictionaryService } from '../../app/services/dictionary.service';
import { DictionaryInterface } from '../sdk';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent {

  @Input() dictionary: DictionaryInterface;

  private displayedColumns: string[] = ['id', 'english', 'hungarian', 'partsOfSpeech', 'synonym', 'example', 'select'];
  private dataSource = new MatTableDataSource(dictionary);

  constructor(private dictionaryService: DictionaryService) { }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatSort) sort: MatSort;

  public getAllWords() {
    this.dictionaryService.getAllWords().subscribe((data) => {
      data.forEach((word) => {
        dictionary.push(word);
      });
      console.log(dictionary);
    }, (error) => {
      console.log(error);
    });
  }

  public modify(): void {

  }

  public delete(): void {

  }
  ngDoCheck() {
    if (dictionary !== []) {
      this.ngOnChanges();
    }
  }

  ngOnChanges() {
    this.dataSource._updateChangeSubscription();
    this.dataSource.sort = this.sort;
    console.log(this.dataSource);
  }

  ngOnInit() {
    this.getAllWords();
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

const dictionary: DictionaryElement[] = [];
