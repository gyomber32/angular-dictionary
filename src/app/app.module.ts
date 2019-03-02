import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../app/app.material.module'
import { SDKBrowserModule } from './sdk';

import { DictionaryService } from '../app/services/dictionary.service';

import { AppComponent } from './app.component';
import { TranslateComponent } from './translate/translate.component';
import { DictionaryComponent } from './dictionary/dictionary.component';
import { AdditionComponent } from './addition/addition.component';
import { ModifyDialogComponent } from './dictionary/dictionary.component';
import { DeleteDialogComponent } from './dictionary/dictionary.component';

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
    AppMaterialModule,
    SDKBrowserModule.forRoot()
  ],
  providers: [DictionaryService],
  entryComponents: [ModifyDialogComponent, DeleteDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
