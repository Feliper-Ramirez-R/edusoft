import { Component } from '@angular/core';
import { UsuariosService } from '../usuarios/usuarios.service';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/api';
import { GruposService } from './grupos.service';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss']
})
export class GruposComponent {

  datosDB: any[] = [];
  item: any = {};

  selectedAlumnos: any[] = [];
  alumnos: any[] = [];

  programas: any[] = [];
  programa:any = {};
  
  alumnosGrupo: any[] = [];
  itemEditDialog: boolean = false;
  itemDeleteDialog: boolean = false;
  alumnosModal: boolean = false;
  alumnosGrupoModal: boolean = false;
  submitted: boolean = false;
  crear: boolean = false;

  constructor(private grupoService: GruposService,
    private user: AuthService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.getGrupos();
  }

  onGlobalFilter(table: any, event: Event) {
    console.log(table, 'table', event, 'event');

    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }


  hideDialog() {
    this.itemEditDialog = false;
    this.submitted = false;
  }
  openEdit(item: any) {
    this.crear = false;
    this.programa = {id:item.program,name:item.program_name};
    this.item = { ...item };
    this.itemEditDialog = true;
    console.log(item);
  }

  deleteAlert(item: any) {
    this.itemDeleteDialog = true;
    this.item = { ...item };
  }

  openAlumn(item:any) {
    this.item = { ...item };
    this.getAlumnos();
  }

  modalAlumnosGrupo(item:any) {
    this.alumnosGrupo = item.alumns;
    console.log(this.alumnosGrupo);
    this.alumnosGrupoModal = true
  }

  openNew() {
    this.crear = true;
    this.item = {};
    this.programa = {};
    this.submitted = false;
    this.itemEditDialog = true;
  }


  async deleteItem() {
    console.log(this.item);

    this.itemDeleteDialog = false;

    const valid: any = await this.grupoService.deleteItem(this.item.id);
    console.log(valid);
    if (!valid.error) {
      if (valid.status == 200) {
        this.item = {};
        this.getGrupos();
        this.messageService.add({ severity: 'success', summary: 'Bien!', detail: valid.message, life: 5000 });
      } else { return this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); }
    } else {
      if (valid.status != 500) { return this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrio un error!', life: 5000 }); }
    }
  }



  async editItem() {
    this.submitted = true;
    if (!this.item.name) { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Todos los campos son requeridos', life: 5000 }); return }

    let dataPost = {

       name: this.item.name,
       program:this.programa.id
      /*  dni: String(this.item.dni),
       role: this.perfil.id,
       email: this.item.email */

    }
    console.log(dataPost)
    const valid: any = await this.grupoService.editItem(dataPost, this.item.id);
    console.log(valid);

    if (!valid.error) {
      if (valid.status == 201) {
        this.item = {};
        this.itemEditDialog = false;
        this.getGrupos();
        this.messageService.add({ severity: 'success', summary: 'Bien!', detail: valid.message, life: 5000 });
      } else { return this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); }
    } else {
      if (valid.status != 500) { return this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrio un error!', life: 5000 }); }
    }
  }


  async saveItem() {
    console.log(this.item, 'crear');

    this.submitted = true;
    if (!this.item.name /* Object.values(this.item).length < 3  */) {
      this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Todos los campos son requeridos', life: 5000 }); return
    };
    let dataPost = {

      name: this.item.name,
      program:this.programa.id
      /*  dni: String(this.item.dni),
       role: this.perfil.id,
       email: this.item.email, */

    }
    console.log(dataPost);
    const valid: any = await this.grupoService.saveItem(dataPost);
    console.log(valid);

    if (!valid.error) {
      if (valid.status == 201) {
        this.hideDialog();
        this.getGrupos();
        this.messageService.add({ severity: 'success', summary: 'Bien!', detail: valid.message, life: 5000 });
      } else { return this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); }
    } else {
      if (valid.status != 500) { return this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrio un error!', life: 5000 }); }
    }
  }

  async getGrupos() {

    const valid: any = await this.grupoService.getGrupos();
    console.log(valid)

    if (!valid.error) {
     
        valid.data.forEach((element:any) => {
          element.alumns? element.alumns =  element.alumns.split(','):''
        });
   
      this.datosDB = valid.data;
      this.programas = valid.programs
      if (valid.status == 200) {

      } else { return this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); }
    } else {
      if (valid.status != 500) { return this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrió un error!', life: 5000 }); }
    }
  }

  async getAlumnos() {

    const valid: any = await this.grupoService.getAlumnos(this.item.id);
    console.log(valid);
    if (!valid.error) {
      this.alumnos = valid.data;
      this.alumnosModal = true;
      if (valid.status == 200) {

      } else { return this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); }
    } else {
      if (valid.status != 500) { return this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrio un error!', life: 5000 }); }
    }

  }


 /*  async getProgramas() {

    const valid: any = await this.grupoService.getProgramas();
    console.log(valid);
    if (!valid.error) {
     

      if (valid.status == 200) {

      } else { return this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); }
    } else {
      if (valid.status != 500) { return this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrio un error!', life: 5000 }); }
    }

  } */


  /* async getProfesores() {

    const valid: any = await this.grupoService.getProfesores();
    console.log(valid);
    if (!valid.error) {
      

      if (valid.status == 200) {

      } else { return this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); }
    } else {
      if (valid.status != 500) { return this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrio un error!', life: 5000 }); }
    }

  } */



  async agregarAlumnos() {
    console.log(this.item);
    console.log(this.selectedAlumnos);


    var ids: any = [];
    await this.selectedAlumnos.forEach((element: any) => {
      ids.push(element.id)
    });

    console.log(ids);

    let dataPost = {
        ids
    }
    console.log(dataPost);

    const valid: any = await this.grupoService.agregarAlumnos(dataPost,this.item.id);
    console.log(valid);

    if (!valid.error) {
      this.alumnos = valid.data;
      this.alumnosModal = true;
      if (valid.status == 201) {
        this.item = {};
        this.alumnosModal = false;
        this.getGrupos();
        this.messageService.add({ severity: 'success', summary: 'Bien!', detail: valid.message, life: 5000 });
      } else { return this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); }
    } else {
      if (valid.status != 500) { return this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrio un error!', life: 5000 }); }
    }

  }

}
