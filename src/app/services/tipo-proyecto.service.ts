import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TipoProyecto } from '@interfaces/tipo-proyecto';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoProyectoService {
    
  urlApi:string = environment.api
  constructor(private http:HttpClient) { }

getTipoProyectos():Observable<TipoProyecto[]>{
    const token = localStorage.getItem('token');
    const options = {
        headers:{
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,  
        }
    }
    return this.http.get<TipoProyecto[]>(`${this.urlApi}/TipoProyecto`,options);
    //return this.http.get<TipoProyecto[]>('https://localhost:7118/api/TipoProyecto',options);
}

agregarTipoProyecto(dato:TipoProyecto){
    const token = localStorage.getItem('token');
    const options = {
        headers:{
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,  
        }
    }

    return this.http.post<TipoProyecto[]>(`${this.urlApi}/TipoProyecto`,dato,options);
}

actualizarTipoProyecto(dato:TipoProyecto){
    const token = localStorage.getItem('token');
    const options = {
        headers:{
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,  
        }
    }

    return this.http.put<TipoProyecto[]>(`${this.urlApi}/TipoProyecto/${dato.idtipoProyecto}`,dato,options);
}

eliminarTipoProyecto(dato:TipoProyecto){
    const token = localStorage.getItem('token');
    const options = {
        headers:{
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,  
        }
    }

   return this.http.delete<TipoProyecto[]>(`${this.urlApi}/TipoProyecto/${dato.idtipoProyecto}`,options);
}

}
