import { Component, OnInit, OnChanges, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { DictionaryService } from '../services/dictionary.service';
import { CommonService } from '../services/common.service';

import { DictionaryElement } from '../dictionary.interface';

const config = new MatSnackBarConfig();
config.duration = 5000;

@Component({
  selector: 'app-addition',
  templateUrl: './addition.component.html',
  styleUrls: ['./addition.component.css']
})
export class AdditionComponent implements OnInit, OnChanges {

  private additionForm: FormGroup;
  private dictionary: DictionaryElement[] = [];
  @Output() wordEmitter = new EventEmitter<DictionaryElement>();
  @Input() englishWord = '';
  @Input() hungarianWord = '';

  constructor(
    private dictionaryService: DictionaryService,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar) { }

  public formValidator() {
    this.additionForm = this.formBuilder.group({
      english: ['', Validators.required],
      hungarian: ['', Validators.required],
      partsOfSpeech: ['', Validators.required],
      synonym: [''],
      example: ['']
    });
  }

  public async checkWordInDatabase(english: string, partsOfSpeech: string): Promise<boolean> {
    const word = await this.dictionaryService.checkWord(english, partsOfSpeech).toPromise();
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

  public async addToDatabase(english: string, hungarian: string, partsOfSpeech: string, synonym: string, example: string) {
    try {
      await this.commonService.cast.subscribe((dictionary) => {
        this.dictionary = [];
        this.dictionary = dictionary;
      }, (error) => {
        console.log(error);
      });
      await this.dictionaryService.addWord(english, hungarian, partsOfSpeech, synonym, example).subscribe(_ => {
        const word = {
          'id': this.dictionary.length > 0 ? (this.dictionary[this.dictionary.length - 1].id + 1) : 1,
          'english': english,
          'hungarian': hungarian,
          'partsOfSpeech': partsOfSpeech,
          'synonym': synonym,
          'example': example
        };
        this.dictionary.push(word);
        this.wordEmitter.emit(word);
        this.commonService.updateDictionary(this.dictionary);
        this.additionForm.reset();
        this.snackBar.open('Successfully added to database!', 'Successful', config);
      }, (error) => {
        console.log(error);
        this.snackBar.open('Error during adding to database!', 'Unsuccessful', config);
      });
    } catch (error) {
      console.log(error);
      this.snackBar.open('Error during adding to database!', 'Unsuccessful', config);
    }
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.additionForm.invalid) {
      return;
    } else {
      const english = this.additionForm.get('english').value;
      const hungarian = this.additionForm.get('hungarian').value;
      const partsOfSpeech = this.additionForm.get('partsOfSpeech').value;
      const synonym = this.additionForm.get('synonym').value;
      const example = this.additionForm.get('example').value;
      this.checkWordInDatabase(english, partsOfSpeech).then(data => {
        if (data === true) {
          this.snackBar.open('The word is already in the database!', 'Watch out', config);
        } else {
          this.addToDatabase(english, hungarian, partsOfSpeech, synonym, example);
        }
      });
    }
  }

  ngOnChanges() {
    if (this.englishWord !== undefined && this.hungarianWord !== undefined) {
      this.additionForm.setValue({ english: this.englishWord, hungarian: this.hungarianWord, partsOfSpeech: '', synonym: '', example: '' });
    }
  }

  ngOnInit() {
    this.formValidator();
    this.commonService.cast.subscribe((dictionary) => {
      this.dictionary = [];
      this.dictionary = dictionary;
    }, (error) => {
      console.log(error);
    });
  }

}
