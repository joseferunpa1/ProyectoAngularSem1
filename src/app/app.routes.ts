import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignInComponent } from './sign-in/sign-in.component';


export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home'
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignInComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
