import { Component, Input, ViewChild, enableProdMode } from '@angular/core';
import { DxDataGridComponent, DxDataGridModule, DxFormModule, DxPopupModule, DxProgressBarModule } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import notify from 'devextreme/ui/notify';
import { EtapaService } from '@services/etapa.service';
import { Etapa } from '@interfaces/etapa';

const MODULES_DEVEXTREME = [DxDataGridModule, DxFormModule, DxPopupModule, DxProgressBarModule];
@Component({
  selector: 'app-etapa',
  standalone: true,
  imports: [MODULES_DEVEXTREME],
  templateUrl: './etapa.component.html',
  styleUrl: './etapa.component.css'
})

export class EtapaComponent {
  @ViewChild(DxDataGridComponent, { static: true }) dataGrid?: DxDataGridComponent;
  @Input() idproyecto:number=0;
  customersData: any;
  shippersData: any;
  dataSource;
  url: string='';
  masterDetailDataSource: any;
  opcionesNuevo:any={
    icon: 'add',
    text: 'Agregar Etapa',
    onClick: () => {
      this.elementoEtapa = {
        idetapa:0,
        nombre:'',
        comentario:'',
        estado:'',
        idproyecto:0,
        fecha_inicio:new Date(),
        fecha_fin:new Date(),
        idusuario:0
      }
      console.log("Nuevo estado");
      this.popupVisible = true;
    },
  };

  opcionesEliminar:any={
    icon: 'remove',
    text: 'Eliminar Etapa',
    onClick: () => {
      console.log("Eliminar estado");
      this.eliminarSeleccionados();
    },
  };

  editorOptions = { placeholder: 'Search column' };
  popupVisible:boolean=false;

  elementoEtapa:Etapa={
    idetapa:0,
    nombre:'',
    comentario:'',
    estado:'',
    idproyecto:0,
    fecha_inicio:new Date(),
    fecha_fin:new Date(),
    idusuario:0
  };

  botonGuardarOpciones={
    width: 300,
    text: 'Guardar Etapa',
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

  constructor(private servicioEtapa:EtapaService) {

    this.fnEditar = this.fnEditar.bind(this);
    this.dataSource = new DataSource({
      key: 'idetapa',
      load: (loadOptions) => {

        return new Promise((resolve, reject) => {

          this.servicioEtapa.getlistEtapa(this.idproyecto).subscribe({
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
    this.elementoEtapa = e.row.data;
    this.popupVisible = true;
    console.log('fila',e, this.popupVisible);
  }

  obtenerAlto(){
    return window.innerHeight;
  }

  fnGuardar(){
    this.elementoEtapa.idproyecto = this.idproyecto;
    if(this.elementoEtapa.idetapa > 0 ){
      this.servicioEtapa.actualizarEtapa(this.elementoEtapa).subscribe({
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

      this.servicioEtapa.agregarEtapa(this.elementoEtapa).subscribe({
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
        idetapa:item.idetapa
      };

      this.servicioEtapa.eliminarEtapa(datosEliminar).subscribe({
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
