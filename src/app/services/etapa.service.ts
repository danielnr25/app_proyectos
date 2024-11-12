import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Etapa } from '@interfaces/etapa';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';


@Injectable({
  providedIn: 'root'
})


export class EtapaService {

  urlApi:string = environment.api;
  constructor(private http : HttpClient) { }

  getlistEtapa(idproyecto:number):Observable<Etapa[]>{
    const token = localStorage.getItem('token');
    const options = {
        headers : {
        'Content-type':'application/json',
        Authorization:`Bearer ${token}`
      }
    }

    return this.http.get<Etapa[]>(`${this.urlApi}/Etapa?idproyecto=${idproyecto}`,options);
  }

  agregarEtapa(dato:Etapa){
    const token = localStorage.getItem('token');
    const options = {
        headers : {
        'Content-type':'application/json',
        Authorization:`Bearer ${token}`
      }
    }

    return this.http.post<Etapa>(`${this.urlApi}/Etapa`,dato,options);
  }

  actualizarEtapa(dato:Etapa){
    const token = localStorage.getItem('token');
    const options = {
        headers : {
        'Content-type':'application/json',
        Authorization:`Bearer ${token}`
      }
    }

    return this.http.put<Etapa>(`${this.urlApi}/Etapa/${dato.idetapa}`,dato,options);
  }

  eliminarEtapa(dato:Etapa){
    const token = localStorage.getItem('token');
    const options = {
        headers : {
        'Content-type':'application/json',
        Authorization:`Bearer ${token}`
      }
    }

    return this.http.delete<Etapa>(`${this.urlApi}/Etapa/${dato.idetapa}`,options);
  }


}
