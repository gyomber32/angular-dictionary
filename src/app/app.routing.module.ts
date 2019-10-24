import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { AuthGuard } from './auth-guard.service';

// needs page not found component
const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'dictionary', canActivate: [AuthGuard], component: HomeComponent },
    { path: '', component: LoginComponent },
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
