import { Component, ViewChild, OnInit, OnChanges, DoCheck, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef } from '@angular/material';
import { DictionaryService } from '../../app/services/dictionary.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent implements OnInit, OnChanges, DoCheck, AfterViewInit {

  private displayedColumns: string[] = ['id', 'english', 'hungarian', 'partsOfSpeech', 'synonym', 'example', 'actions'];
  private dataSource: MatTableDataSource<DictionaryElement>;

  constructor(private dictionaryService: DictionaryService, private modifyDialog: MatDialog, private deleteDialog: MatDialog) {
    this.dataSource = new MatTableDataSource(dictionary);
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
        dictionary.push(wordJSON);
      });
    }, (error) => {
      console.log(error);
    });
  }

  public modify(id: number): void {
    localStorage.setItem('modID', id.toString());
    const modifyDialogRef = this.modifyDialog.open(ModifyDialogComponent);

    modifyDialogRef.afterClosed().subscribe(result => {
      console.log('The modifyDialog was closed!');
      this.dataSource._updateChangeSubscription();
      this.dataSource.sort = this.sort;
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
      this.dataSource._updateChangeSubscription();
      this.dataSource.sort = this.sort;
    });
  }

  ngDoCheck() {
    if (dictionary !== []) {
      this.ngOnChanges();
    }
  }

  ngOnChanges() {
    this.dataSource._updateChangeSubscription();
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    this.getAllWords();
  }

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    // this.getAllWords();
  }

}

export interface DictionaryElement {
  id: number;
  english: string;
  hungarian: string;
  partsOfSpeech: string;
  synonym?: string;
  example?: string;
}

const dictionary: DictionaryElement[] = [];

@Component({
  selector: 'modify-dialog',
  templateUrl: 'modify-dialog.component.html',
  styleUrls: ['./modify-dialog.component.css']
})
export class ModifyDialogComponent implements OnInit {

  private modifyForm: FormGroup;

  constructor(
    private dictionaryService: DictionaryService,
    private formBuilder: FormBuilder,
    private modifyDialogRef: MatDialogRef<ModifyDialogComponent>) { }

  public formValidator() {
    this.modifyForm = this.formBuilder.group({
      english: ['', Validators.required],
      hungarian: ['', Validators.required],
      partsOfSpeech: ['', Validators.required],
      synonym: [''],
      example: ['']
    });
  }

  public getWord(): void {
    //const id = Number(localStorage.getItem('modID'));
    /*const id = 1;
    let english: string;
    let hungarian: string;
    let partsOfSpeech: string;
    let synonym: string;
    let example: string;*/
    this.dictionaryService.getOneWord(1).subscribe((word) => {
      console.log(word);
      /*english = word.english;
      hungarian = word.hungarian;
      partsOfSpeech = word.pos;
      synonym = word.synonym;
      example = word.synonym;*/
    });
    /*this.modifyForm.setValue({ ['english']: english });
    this.modifyForm.setValue({ ['hungarian']: hungarian });
    this.modifyForm.setValue({ ['partsOfSpeech']: partsOfSpeech });
    this.modifyForm.setValue({ ['synonym']: synonym });
    this.modifyForm.setValue({ ['example']: example });*/
  }

  public async checkWordInDatabase(english: string, partsOfSpeech: string): Promise<boolean> {
    const word = await this.dictionaryService.checkWord(english, partsOfSpeech).toPromise();
    console.log(word);
    if (word[0] !== undefined) {
      for (let i = 0; i < word.length; i++) {
        if (english === word[i].english && partsOfSpeech === word[i].pos) {
          return true;
        }
      }
    } else {
      return false;
    }

  }

  onSubmit() {
    // stop here if form is invalid
    if (this.modifyForm.invalid) {
      return;
    } else {
      const english = this.modifyForm.get('english').value;
      const hungarian = this.modifyForm.get('hungarian').value;
      const partsOfSpeech = this.modifyForm.get('partsOfSpeech').value;
      const synonym = this.modifyForm.get('synonym').value;
      const example = this.modifyForm.get('example').value;
      this.checkWordInDatabase(english, partsOfSpeech).then(data => {
        console.log(data);
        if (data === true) {
          alert('The word is already in the database!');
        } else {
          /* Here goes modify */
        }
      });
    }
  }

  public onNoClick(): void {
    this.modifyDialogRef.close();
  }

  ngOnInit() {
    this.formValidator();
    this.getWord();
  }

}

@Component({
  selector: 'delete-dialog',
  templateUrl: 'delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent {

  constructor(private dictionaryService: DictionaryService, private deleteDialogRef: MatDialogRef<DeleteDialogComponent>) { }

  public yes(): void {
    const id = Number(localStorage.getItem('delID'));
    this.dictionaryService.deleteWord(id).subscribe(_ => {
      alert('The word has been deleted!');
    }, (error) => {
      console.log(error);
      alert('Error occurred during delete!');
    });
    this.deleteDialogRef.close();
  }

  public no(): void {
    this.deleteDialogRef.close();
  }

  public onNoClick(): void {
    this.deleteDialogRef.close();
  }

}
