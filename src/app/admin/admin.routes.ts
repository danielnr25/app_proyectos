import { Routes } from '@angular/router';
import { authGuard } from '../guardians/auth.guard';
import { AdminComponent } from './admin.component';
import { TipoProyectoComponent } from '@components/tipo-proyecto/tipo-proyecto.component';
//import { TipoProyectoComponent } from './tipo-proyecto/tipo-proyecto.component';

export const routes:Routes = [
    {
        path:'',
        component:AdminComponent,
        canActivate:[authGuard],
        children:[
            {
                path:'tipo-proyecto',
                component:TipoProyectoComponent
            }
        ]
    }
]