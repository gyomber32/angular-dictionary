import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent implements OnInit {

  displayedColumns: string[] = ['select', 'id', 'english', 'hungarian', 'partOfSpeech', 'synonym', 'example'];
  dataSource = new MatTableDataSource(dictionary);
  selection = new SelectionModel<DictionaryElement>(true, []);

  constructor() { }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

}

export interface DictionaryElement {
  id: number,
  english: string;
  hungarian: string;
  partOfSpeech: string;
  synonym: string;
  example: string;
}

const dictionary: DictionaryElement[] = [
  { id: 1, english: 'zxvzxv', hungarian: 'vzxv', partOfSpeech: 'dvxcvxc', synonym: 'asdasd', example: 'djggjsdkl' },
  { id: 2, english: 'zxvzxv', hungarian: 'vzxv', partOfSpeech: 'dvxcvxc', synonym: 'asdasd', example: 'djggjsdkl' },
  { id: 3, english: 'zxvzxv', hungarian: 'vzxv', partOfSpeech: 'dvxcvxc', synonym: 'asdasd', example: 'djggjsdkl' },
  { id: 4, english: 'zxvzxv', hungarian: 'vzxv', partOfSpeech: 'dvxcvxc', synonym: 'asdasd', example: 'djggjsdkl' }
];
