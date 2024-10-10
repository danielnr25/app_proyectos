import { Component, Input } from '@angular/core';
import { TipoProyecto } from '@interfaces/tipo-proyecto';
import {MatTableModule} from '@angular/material/table';
const MATERIAL_MODULES = [MatTableModule];
@Component({
  selector: 'app-lista-tipo-proyecto',
  standalone: true,
  imports: [MATERIAL_MODULES],
  templateUrl: './lista-tipo-proyecto.component.html',
  styleUrl: './lista-tipo-proyecto.component.css'
})

export class ListaTipoProyectoComponent {
  @Input() listaTiproProyecto: TipoProyecto[] = [{
    idTipoProyecto:0,nombre:'vacio',estado:'sin estado'
  }];

  @Input() EstiloTabla:any;

  displayedColumns: string[] = ['idTipoProyecto', 'nombre', 'estado', 'acciones'];

}
