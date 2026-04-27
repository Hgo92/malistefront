import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { logGuard } from './guards/log-guard-guard';

import { HomeComponent } from './home-component/home-component';
import { AuthComponent } from './auth-component/auth-component';
import { RegisterComponent } from './register-component/register-component';     
import { ListComponent } from './list-component/list-component';
import { AddComponent } from './add-component/add-component';

export const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [authGuard]},
    { path: 'login', component: AuthComponent, canActivate: [authGuard]},
    { path: 'register', component: RegisterComponent, canActivate: [authGuard]},
    { path : 'list', component: ListComponent, canActivate:[logGuard]},
    { path : 'add', component: AddComponent}
];
