import { Component, inject, signal } from '@angular/core';
import { TipoProyecto } from '@interfaces/tipo-proyecto';
import { ListaTipoProyectoComponent } from './lista-tipo-proyecto/lista-tipo-proyecto.component';
import { TipoProyectoService } from '@services/tipo-proyecto.service';

@Component({
  selector: 'app-tipo-proyecto',
  standalone: true,
  imports: [ListaTipoProyectoComponent],
  templateUrl: './tipo-proyecto.component.html',
  styleUrl: './tipo-proyecto.component.css'
})
export class TipoProyectoComponent {
  listTypeProject= signal<TipoProyecto[]>([]);
  _servicioTipoProyecto = inject(TipoProyectoService);

  fnEliminartipoProyecto(item:TipoProyecto){
    console.log(item);
  }

  ngOnInit(){
    this._servicioTipoProyecto.getTipoProyectos().subscribe({
      next:(data)=>{
          console.log("se listo la informacion",data);
          this.listTypeProject.set(data);
      },
      error:(data)=>{
        console.log('error data',data);
      },
      complete:()=>{
        console.log("siempre se ejcuta")
      }
    });


    console.log('Fin ngOnInit');
  }

}
