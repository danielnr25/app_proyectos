import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import {Estado} from '@interfaces/estado'

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

    urlApi:string = environment.api
    constructor(private http : HttpClient) { }

    getListEstado(idproyecto:number):Observable<Estado[]>{
        const token = localStorage.getItem('token');
        const options = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,  
            }
        }
        return this.http.get<Estado[]>(`${this.urlApi}/Estado?idproyecto=${idproyecto}`,options);
    }

    agregarEstado(dato:Estado){
        const token = localStorage.getItem('token');
        const options = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,  
            }
        }

        return this.http.post<Estado[]>(`${this.urlApi}/Estado`,dato,options);
    }

    actualizarEstado(dato:Estado){
        const token = localStorage.getItem('token');
        const options = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,  
            }
        }

        return this.http.put<Estado[]>(`${this.urlApi}/Estado/${dato.idestado}`,dato,options);
    }

    eliminarEstado(dato:Estado){
        const token = localStorage.getItem('token');
        const options = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,  
            }
        }
        return this.http.delete<Estado[]>(`${this.urlApi}/Estado/${dato.idestado}`,options);
    }


}
