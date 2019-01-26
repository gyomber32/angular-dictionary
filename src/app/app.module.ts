import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from '../app/app.material.module'

import { AppComponent } from './app.component';
import { TranslateComponent } from './translate/translate.component';
import { DictionaryComponent } from './dictionary/dictionary.component';
import { AddictionComponent } from './addiction/addiction.component';

@NgModule({
  declarations: [
    AppComponent,
    TranslateComponent,
    DictionaryComponent,
    AddictionComponent
  ],
  imports: [
    BrowserModule,
    AppMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
