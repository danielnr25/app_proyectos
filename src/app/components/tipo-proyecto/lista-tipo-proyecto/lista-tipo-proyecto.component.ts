import { Component, Input, ViewChild } from '@angular/core';
import { TipoProyecto } from '@interfaces/tipo-proyecto';
import {MatTableModule} from '@angular/material/table';
import { BotonComponent } from '@components/boton/boton.component';

const MATERIAL_MODULES = [MatTableModule];
@Component({
  selector: 'app-lista-tipo-proyecto',
  standalone: true,
  imports: [MATERIAL_MODULES,BotonComponent],
  templateUrl: './lista-tipo-proyecto.component.html',
  styleUrl: './lista-tipo-proyecto.component.css'
})

export class ListaTipoProyectoComponent {
  @Input() listaTipoProyectos: TipoProyecto[] = [{
    idtipoProyecto:0,nombre:'vacio',estado:'sin estado'
  }];

  @Input() EstiloTabla:any;

  @ViewChild(BotonComponent) botonComponent?: BotonComponent;
  displayedColumns: string[] = ['idtipoProyecto', 'nombre', 'estado', 'acciones'];

  buttonClicked(item:TipoProyecto){
    console.log('Click en el boton',item);
    this.botonComponent?.clickBoton();
  }

}
