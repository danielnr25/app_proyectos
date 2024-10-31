import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';
import { LoginService } from '@services/login.service';
import { Login } from '@interfaces/login';

const MATERIAL_MODULES = [MatCardModule,MatInputModule,MatButtonModule,MatIconModule,MatProgressBarModule,MatSnackBarModule];
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MATERIAL_MODULES,ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formularioLogin: FormGroup;
  ocultarPassword:boolean = true;
  mostrarLoading:boolean = false;
  private serviceLogin = inject(LoginService);
  private router = inject(Router);
  private _snackbar = inject(MatSnackBar);


  constructor(private fb: FormBuilder){
    this.formularioLogin = this.fb.group({
      usuario: ['', Validators.required],
      clave: ['', Validators.required]
    });
  }

  iniciarSesion(){
    this.mostrarLoading = true;
 
    const request:Login={
      Usuario1:this.formularioLogin.value.usuario,
      Clave:this.formularioLogin.value.clave
    }

    this.serviceLogin.autenticar(request).subscribe({
      next: (data:any)=>{
        console.log('sesion correcta', data);
        localStorage.setItem('token',data.token);
        localStorage.setItem('permisos',JSON.stringify(data.permisos))
        this.router.navigate(['/admin']);
      },
      error: (data)=>{
        console.log('error data:', data);
        this.mostrarLoading = false;
        const titulo = data.status + '-' + data.statusText;

        this._snackbar.open(data.message,titulo,{
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        })
      },
      complete:()=>{
        this.mostrarLoading = false;
      }
    });

  }

}
