import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppMaterialModule } from '../app/app.material.module';
import { SDKBrowserModule } from './sdk';

import { DictionaryService } from '../app/services/dictionary.service';
import { CommonService } from '../app/services/common.service';

import { AppComponent } from './app.component';
import { TranslateComponent } from './translate/translate.component';
import { DictionaryComponent } from './dictionary/dictionary.component';
import { AdditionComponent } from './addition/addition.component';
import { ModifyDialogComponent } from './dictionary/modify-dialog/modify-dialog.component';
import { DeleteDialogComponent } from './dictionary/delete-dialog/delete-dialog.comoponent';

@NgModule({
  declarations: [
    AppComponent,
    TranslateComponent,
    DictionaryComponent,
    ModifyDialogComponent,
    DeleteDialogComponent,
    AdditionComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppMaterialModule,
    SDKBrowserModule.forRoot()
  ],
  providers: [DictionaryService, CommonService],
  entryComponents: [ModifyDialogComponent, DeleteDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
