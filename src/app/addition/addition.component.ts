import { Component, OnInit } from '@angular/core';
//import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  //private additionForm: FormGroup;

  constructor(/*private formBuilder: FormBuilder*/) { }

  /* public formValidator(){
    this.additionForm = this.formBuilder.group({
      english: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      residency: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }*/


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
    //this.formValidator();
  }

}
