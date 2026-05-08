import { Routes } from '@angular/router';
import { authGuard } from './features/authentification/guards/auth-guard';
import { logGuard } from './features/authentification/guards/log-guard-guard';

import { HomeComponent } from './features/home/home-component/home-component';
import { AuthComponent } from './features/authentification/auth-component/auth-component';
import { RegisterComponent } from './features/authentification/register-component/register-component';   
import { ListComponent } from './features/list/list-component/list-component';

export const routes: Routes = [
    {   path : "",
        canActivate : [authGuard],
        children: [
            { path: '', component: HomeComponent},
            { path: 'login', component: AuthComponent},
            { path: 'register', component: RegisterComponent},
        ]
    },
    { path : 'list', component: ListComponent, canActivate:[logGuard]},
];
