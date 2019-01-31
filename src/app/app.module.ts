import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from '../app/app.material.module'
import { DictionaryService } from '../app/services/dictionary.service';

import { AppComponent } from './app.component';
import { TranslateComponent } from './translate/translate.component';
import { DictionaryComponent } from './dictionary/dictionary.component';
import { AdditionComponent } from './addition/addition.component';

import { SDKBrowserModule } from './sdk';

@NgModule({
  declarations: [
    AppComponent,
    TranslateComponent,
    DictionaryComponent,
    AdditionComponent
  ],
  imports: [
    BrowserModule,
    AppMaterialModule,
    SDKBrowserModule.forRoot()
  ],
  providers: [DictionaryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
