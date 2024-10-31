import { Component, inject } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

const MATERIAL_MODULES = [MatToolbarModule, MatButtonModule, MatSidenavModule, MatListModule, MatIconModule];

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MATERIAL_MODULES,RouterModule,CommonModule,AsyncPipe],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
    private breakpointObserver = inject(BreakpointObserver);
    menusPrincipales:any;
    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches),
        shareReplay()
      );
    
    router=inject(Router) 
  
    constructor(){
      let dato:any = localStorage.getItem('permisos')?.toString(); //obtenemos los permisos de localStorage
      let permisos:[] = JSON.parse(dato);
  
      this.menusPrincipales = permisos.filter((obj:any) => {
        return obj.idopcionMenuRef === null;
      });
    }
  
    obtenerSubMenus(id:any):any{
      let dato:any = localStorage.getItem('permisos')?.toString();
      let permisos:[] = JSON.parse(dato);
      return permisos.filter((obj:any) => {
        return obj.idopcionMenuRef === id;
      });
    }
  
    fnCerrar(){
      localStorage.clear();
      this.router.navigate(['login']);
    }
}
