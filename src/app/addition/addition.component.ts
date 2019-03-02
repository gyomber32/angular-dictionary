import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DictionaryService } from '../services/dictionary.service';

@Component({
  selector: 'app-addition',
  templateUrl: './addition.component.html',
  styleUrls: ['./addition.component.css']
})
export class AdditionComponent implements OnInit {

  private additionForm: FormGroup;

  constructor(private dictionaryService: DictionaryService, private formBuilder: FormBuilder) { }

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
    let word = await this.dictionaryService.checkWord(english, partsOfSpeech).toPromise();
    console.log(word);
    if (word[0] != undefined) {
      for (let i = 0; i < word.length; i++) {
        if (english == word[i].english && partsOfSpeech == word[i].pos) {
          return true;
        }
      }
    } else {
      return false;
    }

  }

  public addToDatabase(english: string, hungarian: string, partsOfSpeech: string, synonym: string, example: string): void {
    try {
      this.dictionaryService.addWord(english, hungarian, partsOfSpeech, synonym, example).subscribe(_ => {
        alert("Successfully added to database.");
      }, (error) => {
        console.log(error);
        alert("Error during adding to database.");
      });
    } catch (error) {
      console.log(error);
      alert("Error during adding to database.");
    }
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.additionForm.invalid) {
      return;
    } else {
      let english = this.additionForm.get('english').value;
      let hungarian = this.additionForm.get('hungarian').value;
      let partsOfSpeech = this.additionForm.get('partsOfSpeech').value;
      let synonym = this.additionForm.get('synonym').value;
      let example = this.additionForm.get('example').value;
      this.checkWordInDatabase(english, partsOfSpeech).then(data => {
        console.log(data);
        if (data == true) {
          alert("The word is already in the database!");
        } else {
          this.addToDatabase(english, hungarian, partsOfSpeech, synonym, example);
        }
      });
    }
  }

  ngOnInit() {
    this.formValidator();
  }

}
