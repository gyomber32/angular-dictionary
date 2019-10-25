import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { AuthGuard } from './auth-guard.service';

const appRoutes: Routes = [
    { path: '', canActivate: [AuthGuard], component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'page-not-found', canActivate: [AuthGuard], component: PageNotFoundComponent },
    { path: '**', redirectTo: '/page-not-found' }
];

export const routing = RouterModule.forRoot(appRoutes);
