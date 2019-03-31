import { Component, ViewChild, OnInit, OnChanges, Input } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';

import { DeleteDialogComponent } from './delete-dialog/delete-dialog.comoponent';
import { ModifyDialogComponent } from './modify-dialog/modify-dialog.component';

import { CommonService } from '../../app/services/common.service';
import { DictionaryService } from '../../app/services/dictionary.service';

import { DictionaryElement } from '../dictionary.interface';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent implements OnInit, OnChanges {

  private displayedColumns: string[] = ['english', 'hungarian', 'partsOfSpeech', 'synonym', 'example', 'actions'];
  private dataSource: MatTableDataSource<DictionaryElement>;
  private dictionary: DictionaryElement[] = [];
  @Input() word: DictionaryElement;

  constructor(
    private dictionaryService: DictionaryService,
    private commonService: CommonService,
    private modifyDialog: MatDialog,
    private deleteDialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.dictionary);
    this.dataSource.paginator = this.paginator;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public getAllWords(): void {
    this.dictionaryService.getAllWords().subscribe((data) => {
      data.forEach((word) => {
        const wordJSON = {
          'id': word.id,
          'english': word.english,
          'hungarian': word.hungarian,
          'partsOfSpeech': word.pos,
          'synonym': word.synonym,
          'example': word.example
        };
        this.dictionary.push(wordJSON);
      });
      this.dataSource._updateChangeSubscription();
      this.dataSource.paginator = this.paginator;
    }, (error) => {
      console.log(error);
    });
  }

  public modify(id: number) {
    localStorage.setItem('modID', id.toString());
    const modifyDialogRef = this.modifyDialog.open(ModifyDialogComponent);

    modifyDialogRef.afterClosed().subscribe(result => {
      this.commonService.cast.subscribe((words) => {
        this.dictionary = words;
      });
      this.dataSource._updateChangeSubscription();
      this.dataSource.sort = this.sort;
      console.log('The modifyDialog was closed!');
    });
  }

  public delete(id: number): void {
    localStorage.setItem('delID', id.toString());
    const deleteDialogRef = this.deleteDialog.open(DeleteDialogComponent, {
      width: '290px',
      height: '120px'
    });

    deleteDialogRef.afterClosed().subscribe(result => {
      this.commonService.cast.subscribe((words) => {
        this.dictionary = words;
      });
      this.dataSource._updateChangeSubscription();
      this.dataSource.sort = this.sort;
      console.log('The deleteDialog was closed!');
    });
  }

  ngOnChanges() {
    this.dataSource._updateChangeSubscription();
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.getAllWords();
    this.commonService.updateDictionary(this.dictionary);
    this.dataSource._updateChangeSubscription();
    this.dataSource.sort = this.sort;
  }

}

