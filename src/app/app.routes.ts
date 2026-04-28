import { Routes } from '@angular/router';
import { authGuard } from './features/authentification/guards/auth-guard';
import { logGuard } from './features/authentification/guards/log-guard-guard';

import { HomeComponent } from './features/home/home-component/home-component';
import { AuthComponent } from './features/authentification/auth-component/auth-component';
import { RegisterComponent } from './features/authentification/register-component/register-component';   
import { ListComponent } from './features/list/list-component/list-component';
import { AddComponent } from './features/list/add-component/add-component';

export const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [authGuard]},
    { path: 'login', component: AuthComponent, canActivate: [authGuard]},
    { path: 'register', component: RegisterComponent, canActivate: [authGuard]},
    { path : 'list', component: ListComponent, canActivate:[logGuard]},
    { path : 'add', component: AddComponent}
];
