import { Component, Input, ViewChild, enableProdMode } from '@angular/core';
import { DxDataGridComponent, DxDataGridModule, DxFormModule, DxPopupModule, DxProgressBarModule } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import notify from 'devextreme/ui/notify';
import { EstadoService } from '@services/estado.service';
import { Estado } from '@interfaces/estado';

const MODULES_DEVEXTREME = [DxDataGridModule, DxFormModule, DxPopupModule, DxProgressBarModule];

@Component({
  selector: 'app-estado',
  standalone: true,
  imports: [MODULES_DEVEXTREME],
  templateUrl: './estado.component.html',
  styleUrl: './estado.component.css'
})
export class EstadoComponent {
  @ViewChild(DxDataGridComponent, { static: true }) dataGrid?: DxDataGridComponent;

  @Input() idproyecto:number=0;
  customersData: any;

  shippersData: any;

  dataSource;

  url: string='';

  masterDetailDataSource: any;

  opcionesNuevo:any={
    icon: 'add',
    text: 'Agregar Estado',
    onClick: () => {
      this.elementoEstado = {
        idestado:0,
        nombre:'',
        comentario:'',
        estado1:'',
        maximo_tareas:0,
        idproyecto:0
      }
      console.log("Nuevo estado");
      this.popupVisible = true;
    },
  };

  opcionesEliminar:any={
    icon: 'remove',
    text: 'Eliminar Estado',
    onClick: () => {
      console.log("Eliminar estado");
      this.eliminarSeleccionados();
    },
  };

  editorOptions = { placeholder: 'Search column' };


  popupVisible:boolean=false;

  elementoEstado:Estado={
    idestado:0,
    nombre:'',
    comentario:'',
    estado1:'',
    idproyecto:0,
    maximo_tareas:0
  };

  botonGuardarOpciones={
    width: 300,
    text: 'Guardar Estado',
    type: 'default',
    stylingMode: 'contained',
    onClick: () => {
      this.popupVisible = false;
      this.fnGuardar();
    },
  }
  showProgressBar:boolean=false;
  progressValue:number=0;

  /*----Variables de la paginacion Grid ------- */
  readonly allowedPageSizes:any = [5,10, 30, 100, 'all'];
  showPageSizeSelector = true;
  showInfo = true;
  showNavButtons = true;

  constructor(private servicioEstado:EstadoService) {
    this.fnEditar = this.fnEditar.bind(this);
    this.dataSource = new DataSource({
      key: 'idestado',
      load: (loadOptions) => {
        return new Promise((resolve, reject) => {

          this.servicioEstado.getlistEstado(this.idproyecto).subscribe({
            next: data => {
              console.log(data);
              let result = {
                data: data,
                totalCount: data.length
              };
              resolve(result);
            },
            error: err => {
              reject(err);
            }
          });
        });
      }
    });
  }

  fnEditar(e:any){
    this.elementoEstado = e.row.data;
    this.popupVisible = true;
    console.log('fila',e, this.popupVisible);
  }

  obtenerAlto(){
    return window.innerHeight;
  }

  fnGuardar(){
    this.elementoEstado.idproyecto = this.idproyecto;
    this.elementoEstado.maximo_tareas = 0;
    console.log('elementoEstado',this.elementoEstado);

    if(this.elementoEstado.idestado > 0 ){
      this.servicioEstado.actualizarEstado(this.elementoEstado).subscribe({
        next: data => {
          console.log(data);
          notify({
            message: 'Se actualizo de manera correcta',
            type:'success',
            displayTime: 1000,
            animation: {
              show: {
                type: 'fade', duration: 400, from: 0, to: 1,
              },
              hide: { type: 'fade', duration: 40, to: 0 },
            },
          });
          this.refresh();
        },
        error: err => {
          console.log(err)
        }
      });
    }else{

      this.servicioEstado.agregarEstado(this.elementoEstado).subscribe({
        next: data => {
          console.log(data);
          notify({
            message: 'Se guardo de manera correcta',
            type:'success',
            displayTime: 1000,
            animation: {
              show: {
                type: 'fade', duration: 400, from: 0, to: 1,
              },
              hide: { type: 'fade', duration: 40, to: 0 },
            },
          });
          this.refresh();

        },
        error: err => {
          console.log(err)
        }
      });
    }
    this.refresh();
  }

  eliminarSeleccionados() {
    const seleccionados :any = this.dataGrid?.instance.getSelectedRowsData();
    console.log(seleccionados);

    if (seleccionados.length === 0) {
      notify({
        message: 'Debe seleccionar un registro a eliminar',
        type:'info',
        displayTime: 1000,
        animation: {
          show: {
            type: 'fade', duration: 400, from: 0, to: 1,
          },
          hide: { type: 'fade', duration: 40, to: 0 },
        },
      });
      return;
    }
    this.showProgressBar = true;
    const totalItems = seleccionados.length;
    let itemsEliminados = 0;

    seleccionados.forEach((item:any, index:any) => {
      console.log('datos item',item);
      let datosEliminar:any={
        idestado:item.idestado
      };

      this.servicioEstado.eliminarEstado(datosEliminar).subscribe({
        next: data => {
          console.log('data',data);
          itemsEliminados++;
          this.progressValue = (itemsEliminados / totalItems) * 100;
          // Si todos los elementos han sido eliminados, oculta la barra de progreso
          if (itemsEliminados === totalItems) {
            this.showProgressBar = false;
            this.progressValue = 0;

            notify("Se elimino correctamente", 'success', 2000);
            this.refresh();
          }

        },
        error: errores => {
          console.log(errores);
        }
      });
    });
  }

  refresh(){
    this.dataGrid?.instance.refresh();
  }
}
