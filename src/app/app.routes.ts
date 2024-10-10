import { Routes } from '@angular/router';
//import { HomeComponent } from '@components/home/home.component';


export const routes: Routes = [
  // {
  //   path: '',
  //   component: HomeComponent
  // }
  {
    path: '',
    loadChildren: () => import('./pages/private/private.routes').then(m => m.privateRoute)
  }
];
