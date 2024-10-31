import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Login } from '@interfaces/login';
import { RespuestaApi } from '@interfaces/respuesta-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  http =  inject(HttpClient);
  constructor() { }

  autenticar(data:Login):Observable<Login>{
    return this.http.post<Login>('https://localhost:7118/api/Sesion/autenticar',data);
  }

  autenticado():Observable<RespuestaApi>{
    const token = localStorage.getItem('token');
    const options = {
        headers:{
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,  
        }
    }
    return this.http.post<RespuestaApi>('https://localhost:7118/api/Sesion/autenticado',null, options);
  }

  estadoAutenticado(){
    const token = localStorage.getItem('token');
    return token;
  }


}
