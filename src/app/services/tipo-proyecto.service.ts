import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TipoProyecto } from '@interfaces/tipo-proyecto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoProyectoService {
  http =  inject(HttpClient);
  constructor() { }

  getTipoProyectos():Observable<TipoProyecto[]>{
    return this.http.get<TipoProyecto[]>('https://localhost:7118/api/TipoProyecto');
  }
}
