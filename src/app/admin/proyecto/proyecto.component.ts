import { Component, ViewChild } from '@angular/core';
import { DxButtonModule, DxDataGridComponent, DxDataGridModule, DxFormModule, DxPopupModule, DxProgressBarModule, DxRadioGroupModule, DxScrollViewModule, DxTabsModule, DxToolbarModule } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import notify from 'devextreme/ui/notify';
import { Proyecto } from '@interfaces/proyecto';
import { ProyectoService } from '@services/proyecto.service';
import { TipoProyecto } from '@interfaces/tipo-proyecto';
import { TipoProyectoService } from '@services/tipo-proyecto.service';
import { AreaComponent } from '../area/area.component';

import { Tarea } from '@interfaces/tarea';
import { MiembroComponent } from '../miembro/miembro.component';
import { EstadoComponent } from '../estado/estado.component';
import { EtapaComponent } from '../etapa/etapa.component';
import { UserAvatarComponent } from '@shared/user-avatar/user-avatar.component';
import { TareaKanbanComponent } from '@shared/tarea-kanban/tarea-kanban.component';
import { AdminTareaListaComponent } from '@shared/admin-tarea-lista/admin-tarea-lista.component';

const MODULES_EXTREME = [DxDataGridModule,DxFormModule,DxPopupModule,DxProgressBarModule,DxScrollViewModule,DxTabsModule,DxButtonModule,DxToolbarModule,DxRadioGroupModule];
@Component({
  selector: 'app-proyecto',
  standalone: true,
  imports: [MODULES_EXTREME,AreaComponent,MiembroComponent,EstadoComponent,EtapaComponent,UserAvatarComponent,TareaKanbanComponent,AdminTareaListaComponent],
  templateUrl: './proyecto.component.html',
  styleUrl: './proyecto.component.css'
})

export class ProyectoComponent {
    @ViewChild(DxDataGridComponent, { static: true }) dataGrid?: DxDataGridComponent;

    customersData: any;
    shippersData: any;
    dataSource;
    url: string='';
    masterDetailDataSource: any;

    opcionesNuevo:any={
        icon: 'add',
        text: 'Agregar Proyecto',
        onClick: () => {
          this.elementoProyecto = {
            idproyecto:0,
            nombre:'',
            idtipoProyecto:0,
            fechaInicio:new Date(),
            fechaFin:new Date(),
            detalle:'',
            estado:'',
            idusuario:1
          }
          console.log("Nuevo proyecto");
          this.popupVisible = true;
    
          if(this.elementoProyecto.idproyecto>0){
            this.taskPanelItems = [
              {
                text: 'Proyecto',
              },
              {
                text: 'Areas',
              },
              {
                text: 'Etapas',
              },
              {
                text: 'Estados',
              },
              {
                text: 'Miembros',
              },
              {
                text: 'Panel Canva',
              }
            ]
          }else{
            this.taskPanelItems = [
              {
                text: 'Proyecto',
              }
            ]
          }
        },
    };

    opcionesEliminar:any={
        icon: 'remove',
        text: 'Eliminar Proyecto',
        onClick: () => {
          console.log("Eliminar proyecto");
          this.eliminarSeleccionados();
        },
    };
    
    editorOptions = { placeholder: 'Search column' };
    popupVisible:boolean=false;

    elementoProyecto:Proyecto={
        idproyecto:0,
        nombre:'',
        idtipoProyecto:0,
        fechaInicio:new Date(),
        fechaFin:new Date(),
        detalle:'',
        estado:'',
        idusuario:1
    };

    botonGuardarOpciones={
        width: 300,
        text: 'Guardar Proyecto',
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

    listaTiposProyecto:any=[];
    taskPanelItems:any[] = [
        {
        text: 'Informacion',
        },
        {
        text: 'Areas',
        },
        {
        text: 'Etapas',
        },
        {
        text: 'Estados',
        },
        {
        text: 'Miembros',
        },
        {
        text: 'Panel Canva de Tareas',
        }
    ]

    mostrarInformacionProyecto:boolean=true;
    mostrarEstado:boolean=false;
    mostrarKanba:boolean=false;
    mostrarArea:boolean=false;
    mostrarEtapa:boolean=false;
    mostrarMiembro:boolean=false;

    misTareas:Tarea[]=[{
        idtarea:0,
        nombre:'Tarea 01',
        comentario:'',
        idarea:1,
        idestado:1,
        idetapa:1,
        idmiembro:1,
        idproyecto:1,
        area:'Area01',
        estado:'Pendiente',
        etapa:'Etapa 01',
        miembro:'Miembro 01'
    }]

    constructor(private servicioProyectos:ProyectoService,private servicioTipoProyecto:TipoProyectoService) {
        this.fnEditar = this.fnEditar.bind(this);
        this.dataSource = new DataSource({
          key: 'idproyecto',
          load: (loadOptions) => {
            return new Promise((resolve, reject) => {
              this.servicioProyectos.getListProyecto().subscribe({
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
    
        this.servicioTipoProyecto.getTipoProyectos().subscribe({
          next: data => {
            console.log(data);
            this.listaTiposProyecto = data;
          },
          error: err => { 
          }
        });
    }
    
    fnEditar(e:any){
        this.elementoProyecto = e.row.data;
        this.popupVisible = true;
        console.log('fila',e, this.popupVisible);
    
        if(this.elementoProyecto.idproyecto>0){
          this.taskPanelItems = [
            {
              text: 'Proyecto',
            },
            {
              text: 'Areas',
            },
            {
              text: 'Etapas',
            },
            {
              text: 'Estados',
            },
            {
              text: 'Miembros',
            },
            {
              text: 'Panel Canva',
            }
          ]
        }else{
          this.taskPanelItems = [
            {
              text: 'Proyecto',
            }
          ]
        }

        this.mostrarInformacionProyecto=true;
        this.mostrarEstado=false;
        this.mostrarKanba=false;
        this.mostrarArea=false;
        this.mostrarEtapa=false;
        this.mostrarMiembro=false;
    }

    obtenerAlto(){
        return window.innerHeight;
    }
    

    fnGuardar(){
        let datos = {
            idproyecto : this.elementoProyecto.idproyecto,
            nombre : this.elementoProyecto.nombre,
            fechaInicio : this.elementoProyecto.fechaInicio,
            fechaFin : this.elementoProyecto.fechaFin,
            estado : this.elementoProyecto.estado,
            idusuario : 1,
            detalle: this.elementoProyecto.detalle,
            idtipoProyecto : this.elementoProyecto.idtipoProyecto
        }

        if(this.elementoProyecto.idproyecto > 0 ){
            this.servicioProyectos.actualizarProyecto(datos).subscribe({
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
              },
              error: err => {              
                console.log(err)
              }
            });
          }else{
            this.servicioProyectos.agregarProyecto(datos).subscribe({
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
            idproyecto:item.idproyecto
          };     
    
          this.servicioProyectos.eliminarProyecto(datosEliminar).subscribe({
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
    
    tabValueChange(e:any){
        console.log('click en pestaña',e);
        this.mostrarInformacionProyecto=(e.itemIndex == 0);
        this.mostrarEstado = (e.itemIndex == 3);
        this.mostrarKanba = (e.itemIndex == 5);
        this.mostrarArea = (e.itemIndex == 1);
        this.mostrarEtapa = (e.itemIndex == 2);
        this.mostrarMiembro = (e.itemIndex == 4);
    }

    fnCancelar(){
        this.popupVisible=false;
      }
    
    

}
