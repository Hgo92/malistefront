import { Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { AuthComponent } from './auth-component/auth-component';
import { RegisterComponent } from './register-component/register-component';     
import { ListComponent } from './list-component/list-component';
import { AddComponent } from './add-component/add-component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: AuthComponent},
    { path: 'register', component: RegisterComponent },
    { path : 'list', component: ListComponent},
    {path : 'add', component: AddComponent}
];
