import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Miembro } from '@interfaces/miembro';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class MiembroService {

  urlApi:string = environment.api;

  constructor(private http : HttpClient) { }


  getlistMiembro(idproyecto:number):Observable<Miembro[]>{
    const token = localStorage.getItem('token');
    const options = {
        headers : {
        'Content-type':'application/json',
        Authorization:`Bearer ${token}`
      }
    }

    return this.http.get<Miembro[]>(`${this.urlApi}/Miembro?idproyecto=${idproyecto}`,options);
  }

  agregarMiembro(dato:Miembro){
    const token = localStorage.getItem('token');
    const options = {
        headers : {
        'Content-type':'application/json',
        Authorization:`Bearer ${token}`
      }
    }

    return this.http.post<Miembro>(`${this.urlApi}/Miembro`,dato,options);
  }

  actualizarMiembro(dato:Miembro){
    const token = localStorage.getItem('token');
    const options = {
        headers : {
        'Content-type':'application/json',
        Authorization:`Bearer ${token}`
      }
    }

    return this.http.put<Miembro>(`${this.urlApi}/Miembro/${dato.idmiembro}`,dato,options);
  }

  eliminarMiembro(dato:Miembro){
    const token = localStorage.getItem('token');
    const options = {
        headers : {
        'Content-type':'application/json',
        Authorization:`Bearer ${token}`
      }
    }

    return this.http.delete<Miembro>(`${this.urlApi}/Miembro/${dato.idmiembro}`,options);
  }

}
