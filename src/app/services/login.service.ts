import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Login } from '@interfaces/login';
import { RespuestaApi } from '@interfaces/respuesta-api';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  urlApi:string = environment.api
  constructor(private http : HttpClient) { 

  }

  autenticar(data:Login):Observable<Login>{
    return this.http.post<Login>(`${this.urlApi}/autenticar`,data);
  }

  autenticado():Observable<RespuestaApi>{
    const token = localStorage.getItem('token');
    const options = {
        headers:{
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,  
        }
    }
    return this.http.post<RespuestaApi>(`${this.urlApi}/Sesion/autenticado`,null, options);
  }

  estadoAutenticado(){
    const token = localStorage.getItem('token');
    return token;
  }


}
