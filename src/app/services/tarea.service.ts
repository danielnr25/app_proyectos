import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarea } from '@interfaces/tarea';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  urlApi:string = environment.api;
  constructor(private http : HttpClient) { }

  getlistTarea(idproyecto:number):Observable<Tarea[]>{
    const token = localStorage.getItem('token');
    const options = {
        headers : {
        'Content-type':'application/json',
        Authorization:`Bearer ${token}`
      }
    }

    return this.http.get<Tarea[]>(`${this.urlApi}/Tarea?idproyecto=${idproyecto}`,options);
  }

  agregarTarea(dato:Tarea){
    const token = localStorage.getItem('token');
    const options = {
        headers : {
        'Content-type':'application/json',
        Authorization:`Bearer ${token}`
      }
    }

    return this.http.post<Tarea>(`${this.urlApi}/Tarea`,dato,options);
  }

  actualizarTarea(dato:Tarea){
    const token = localStorage.getItem('token');
    const options = {
        headers : {
        'Content-type':'application/json',
        Authorization:`Bearer ${token}`
      }
    }

    return this.http.put<Tarea>(`${this.urlApi}/Tarea/${dato.idtarea}`,dato,options);
  }

  actualizarTareaEstado(dato:Tarea){
    const token = localStorage.getItem('token');
    const options = {
        headers : {
        'Content-type':'application/json',
        Authorization:`Bearer ${token}`
      }
    }

    return this.http.put<Tarea>(`${this.urlApi}/Tarea/estado/${dato.idtarea}`,dato,options);
  }

  eliminarTarea(dato:Tarea){
    const token = localStorage.getItem('token');
    const options = {
        headers : {
        'Content-type':'application/json',
        Authorization:`Bearer ${token}`
      }
    }

    return this.http.delete<Tarea>(`${this.urlApi}/Tarea/${dato.idtarea}`,options);
  }
}
