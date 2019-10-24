import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

// needs page not found component
const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'dictionary', component: HomeComponent },
    { path: '', component: LoginComponent },
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
