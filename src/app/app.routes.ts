import { Routes } from '@angular/router';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { AdminComponent } from './admin/admin.component';
//import { HomeComponent } from '@components/home/home.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path:'admin',
    //component:AdminComponent,
    loadChildren:() =>import('./admin/admin.routes').then(a=>a.routes)
  }
];
