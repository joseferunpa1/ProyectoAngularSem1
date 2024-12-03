import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { GestuserComponent } from './components/gestuser/gestuser.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NuevaComponent } from './components/nueva/nueva.component';
import { ListComponent } from './components/list/list.component';
import { EditComponent } from './components/edit/edit.component'; 
import { EncuestasComponent } from './components/encuestas/encuestas.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { ResultComponent } from './components/result/result.component';


export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard-admin', component: DashboardAdminComponent },
  { path: 'gestuser', component: GestuserComponent },
  {path: 'encuestas', component: EncuestasComponent},
  {path: 'encuesta/:ID', component: EncuestaComponent},
  {path: 'dashboard', component: DashboardComponent, children: [
    {path: 'new', component: NuevaComponent},
    {path: 'list', component: ListComponent},
    {path: 'edit/:ID', component: EditComponent},
    {path: 'result/:ID', component: ResultComponent},
    {path: '', redirectTo: 'encuestas', pathMatch: 'full'}
  ]},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule {}