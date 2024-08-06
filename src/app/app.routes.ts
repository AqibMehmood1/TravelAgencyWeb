import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { authGuard } from './Gourds/auth.guard';
import { DeshboardComponent } from './Components/Admin/deshboard/deshboard.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    {path: 'deshboard', component: DeshboardComponent ,canActivate:[authGuard] },
    // { path: 'login', component: LoginComponent ,canActivate:[authGuard] },
  // Add other routes here
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
];
