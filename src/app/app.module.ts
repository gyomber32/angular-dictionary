import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppMaterialModule } from '../app/app.material.module';
import { HttpClientModule } from '@angular/common/http';

import { routing } from './app.routing.module';

import { AuthService } from '../app/services/auth.service';
import { AuthGuard } from './auth-guard.service';
import { DictionaryService } from '../app/services/dictionary.service';
import { CommonService } from '../app/services/common.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LoadingSpinnerCopmonent } from './shared/loading-spinner.component';
import { TranslateComponent } from './home/dictionary/translate/translate.component';
import { DictionaryComponent } from './home/dictionary/dictionary.component';
import { AdditionComponent } from './addition/addition.component';
import { ModifyDialogComponent } from './home/dictionary/modify-dialog/modify-dialog.component';
import { DeleteDialogComponent } from './home/dictionary/delete-dialog/delete-dialog.comoponent';
import { MultiCellComponent } from './home/dictionary/multi-cell/multi-cell.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LoadingSpinnerCopmonent,
    TranslateComponent,
    DictionaryComponent,
    ModifyDialogComponent,
    DeleteDialogComponent,
    AdditionComponent,
    MultiCellComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppMaterialModule,
    routing
  ],
  providers: [AuthService, AuthGuard, DictionaryService, CommonService],
  entryComponents: [ModifyDialogComponent, DeleteDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
