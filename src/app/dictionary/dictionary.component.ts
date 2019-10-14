import { Component, ViewChild, OnInit, OnChanges, Input, AfterViewInit } from '@angular/core';
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
export class DictionaryComponent implements OnInit, OnChanges, AfterViewInit {

  public displayedColumns: string[] = ['english', 'hungarian', 'partsOfSpeech', 'synonym', 'example', 'createdAt', 'actions'];
  public dataSource: MatTableDataSource<DictionaryElement>;
  private dictionary: DictionaryElement[] = [];
  @Input() word: DictionaryElement;

  constructor(
    private dictionaryService: DictionaryService,
    private commonService: CommonService,
    private modifyDialog: MatDialog,
    private deleteDialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.dictionary);
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: DictionaryElement, filterValue: string) => {
      for (let i = 0; i <= data.details.length; i++) {
        return data.details[i].hungarian.trim().toLowerCase().indexOf(filterValue) !== -1;
      }
    };
    this.dataSource.filterPredicate = (data: DictionaryElement, filterValue: string) => {
      for (let i = 0; i <= data.details.length; i++) {
        return data.details[i].partsOfSpeech.trim().toLowerCase().indexOf(filterValue) !== -1;
      }
    };
    this.dataSource.filterPredicate = (data: DictionaryElement, filterValue: string) => {
      for (let i = 0; i <= data.details.length; i++) {
        return data.details[i].synonym.trim().toLowerCase().indexOf(filterValue) !== -1;
      }
    };
    this.dataSource.filterPredicate = (data: DictionaryElement, filterValue: string) => {
      for (let i = 0; i <= data.details.length; i++) {
        return data.details[i].example.trim().toLowerCase().indexOf(filterValue) !== -1;
      }
    };
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
    this.dictionaryService.getAllWords().subscribe((words) => {
      words.data.forEach((word: DictionaryElement) => {
        this.dictionary.push(word);
      });
      this.dictionary = words.data;
      this.dataSource._updateChangeSubscription();
      this.dataSource.paginator = this.paginator;
    }, (error) => {
      console.log(error);
    });
  }

  public modify(id: string) {
    localStorage.setItem('modID', id);
    const modifyDialogRef = this.modifyDialog.open(ModifyDialogComponent);

    modifyDialogRef.afterClosed().subscribe(result => {
      this.commonService.cast.subscribe((words) => {
        this.dictionary = words;
      });
      this.dataSource._updateChangeSubscription();
      this.dataSource.sort = this.sort;
      localStorage.removeItem('modID');
    });
  }

  public delete(id: string): void {
    localStorage.setItem('delID', id);
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
      localStorage.removeItem('delID');
    });
  }

  ngOnChanges() {
    this.dataSource._updateChangeSubscription();
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.getAllWords();
    this.dataSource._updateChangeSubscription();
  }

  ngAfterViewInit() {
    this.commonService.updateDictionary(this.dictionary);
  }

}

