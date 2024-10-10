import { Component } from '@angular/core';

@Component({
  selector: 'app-boton',
  standalone: true,
  imports: [],
  templateUrl: './boton.component.html',
  styleUrl: './boton.component.css'
})
export class BotonComponent {
  nombreBoton: string = 'Defecto';
  clickBoton() {
    alert('Click en el botón');
  }

  ngOnDestroy(){
    console.log('Se elimino el componente');
  }

}
