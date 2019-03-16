import { Component, ViewChild, OnInit, OnChanges, DoCheck, AfterViewInit, ChangeDetectorRef, Input } from '@angular/core';
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
export class DictionaryComponent implements OnInit, OnChanges, DoCheck, AfterViewInit {

  private displayedColumns: string[] = ['id', 'english', 'hungarian', 'partsOfSpeech', 'synonym', 'example', 'actions'];
  @Input() dataSource: MatTableDataSource<DictionaryElement>;
  @Input() dictionary: DictionaryElement[] = [];

  constructor(
    private dictionaryService: DictionaryService,
    private commonService: CommonService,
    private modifyDialog: MatDialog,
    private deleteDialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef) {
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
    }, (error) => {
      console.log(error);
    });
  }

  public modify(id: number) {
    localStorage.setItem('modID', id.toString());
    const modifyDialogRef = this.modifyDialog.open(ModifyDialogComponent);

    modifyDialogRef.afterClosed().subscribe(result => {
      this.commonService.cast.subscribe((word) => {
        for (let i = 0; i < this.dictionary.length; i++) {
          if (this.dictionary[i].id === word.id) {
            this.dictionary[i] = word;
          }
        }
      });
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
      console.log('The deleteDialog was closed!');
    });
  }

  ngOnChanges() {
    console.log('ngOnChange called');
    this.getAllWords();
    /*this.dataSource._updateChangeSubscription();
    this.dataSource.sort = this.sort;*/
  }

  ngOnInit() {
    console.log('onInit');
    this.getAllWords();
    this.commonService.updateDictionary(this.dictionary);
    /*this.dataSource._updateChangeSubscription();
    this.dataSource.sort = this.sort;*/
    /* this.commonService.cast.subscribe((word) => {
      word.id = dictionary[dictionary.length - 1].id;
      console.log('word: ', word);
      dictionary.push(word);
    }); */
  }

  ngDoCheck() {
    console.log('ngDoCheck called');
    this.commonService.cast.subscribe((dictionary) => {
      console.log('word checked?');
      this.dictionary = [];
      this.dictionary = dictionary;
      console.log(this.dictionary);
    }, (error) => {
      console.log(error);
    });
    this.dataSource._updateChangeSubscription();
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
}

