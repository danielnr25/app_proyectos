import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import {Area} from '@interfaces/area'

@Injectable({
  providedIn: 'root'
})
export class AreaService {

    urlApi:string = environment.api
    constructor(private http : HttpClient) { }

    getListArea(idproyecto:number):Observable<Area[]>{
        const token = localStorage.getItem('token');
        const options = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,  
            }
        }
        return this.http.get<Area[]>(`${this.urlApi}/Area?idproyecto=${idproyecto}`,options);
    }

    agregarArea(dato:Area){
        const token = localStorage.getItem('token');
        const options = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,  
            }
        }

        return this.http.post<Area[]>(`${this.urlApi}/Area`,dato,options);
    }

    actualizarArea(dato:Area){
        const token = localStorage.getItem('token');
        const options = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,  
            }
        }

        return this.http.put<Area[]>(`${this.urlApi}/Area/${dato.idarea}`,dato,options);
    }

    eliminarArea(dato:Area){
        const token = localStorage.getItem('token');
        const options = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,  
            }
        }
        return this.http.delete<Area[]>(`${this.urlApi}/Area/${dato.idarea}`,options);
    }

    

}
