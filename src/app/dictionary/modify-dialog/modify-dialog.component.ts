import { Component, ViewChild, OnInit, OnChanges, DoCheck, AfterViewInit, ChangeDetectorRef, Input } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef } from '@angular/material';
import { DictionaryService } from '../../services/dictionary.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../services/common.service';

@Component({
    selector: 'app-modify-dialog',
    templateUrl: 'modify-dialog.component.html',
    styleUrls: ['./modify-dialog.component.css']
})
export class ModifyDialogComponent implements OnInit {

    private modifyForm: FormGroup;

    constructor(
        private dictionaryService: DictionaryService,
        private commonService: CommonService,
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

    public getOneWord(): void {
        const id = Number(localStorage.getItem('modID'));
        this.dictionaryService.getOneWord(id).subscribe((word) => {
            this.modifyForm.setValue({
                ['english']: word[0].english,
                ['hungarian']: word[0].hungarian,
                ['partsOfSpeech']: word[0].pos,
                ['synonym']: word[0].synonym,
                ['example']: word[0].example
            });
        }, (error) => {
            console.log(error);
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

    public onSubmit() {
        // stop here if form is invalid
        if (this.modifyForm.invalid) {
            return;
        } else {
            const id = Number(localStorage.getItem('modID'));
            const english = this.modifyForm.get('english').value;
            const hungarian = this.modifyForm.get('hungarian').value;
            const partsOfSpeech = this.modifyForm.get('partsOfSpeech').value;
            const synonym = this.modifyForm.get('synonym').value;
            const example = this.modifyForm.get('example').value;
            this.dictionaryService.modifyWord(id, english, hungarian, partsOfSpeech, synonym, example).subscribe((success) => {
                const word = {
                    'id': id,
                    'english': english,
                    'hungarian': hungarian,
                    'partsOfSpeech': partsOfSpeech,
                    'synonym': synonym,
                    'example': example
                };
                this.commonService.updateDictionary(word);
                this.modifyDialogRef.close();
            }, (error) => {
                console.log(error);
            });
        }
    }

    public onNoClick(): void {
        this.modifyDialogRef.close();
    }

    ngOnInit() {
        this.formValidator();
        this.getOneWord();
    }

}