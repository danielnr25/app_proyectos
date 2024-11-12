import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyecto } from '@interfaces/proyecto';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})

export class ProyectoService {
    urlApi:string = environment.api
    constructor(private http: HttpClient) { }

    getListProyecto():Observable<Proyecto[]> {

        const token = localStorage.getItem('token');
        const options = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,  
            }
        }

        return this.http.get<Proyecto[]>(`${this.urlApi}/Proyecto`,options);
    }

    agregarProyecto(dato:Proyecto){
        const token = localStorage.getItem('token');
        const options = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,  
            }
        }

        return this.http.post<Proyecto[]>(`${this.urlApi}/Proyecto`,dato,options);
    }

    actualizarProyecto(dato:Proyecto){
        const token = localStorage.getItem('token');
        const options = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,  
            }
        }
        return this.http.put<Proyecto[]>(`${this.urlApi}/Proyecto/${dato.idproyecto}`,options);
    }

    eliminarProyecto(dato:Proyecto){
        const token = localStorage.getItem('token');
        const options = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,  
            }
        }
        
        return this.http.delete<Proyecto[]>(`${this.urlApi}/Proyecto/${dato.idproyecto}`,options);
    }

    obtenerCombosProyecto(idproyecto:number){
        const token = localStorage.getItem('token');
        const options = {
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,  
            }
        }

        return this.http.get<Proyecto>(`${this.urlApi}/Proyecto/Combos/${idproyecto}`,options);
    }

}
