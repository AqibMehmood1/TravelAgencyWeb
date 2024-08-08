import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { authGuard } from './Gourds/auth.guard';
import { MainComponent } from './Components/Admin/main/main.component';
import { DashbourdComponent } from './Components/Admin/dashbourd/dashbourd.component';


export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashbourd', component: DashbourdComponent },
    {path: 'main', component: MainComponent ,canActivate:[authGuard] },
  // Add other routes here
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
];
