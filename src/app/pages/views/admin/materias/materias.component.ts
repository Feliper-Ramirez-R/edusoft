import { Component } from '@angular/core';
import { MateriasService } from './materias.service';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.scss']
})
export class MateriasComponent {

  datosDB: any[] = [];
  item: any = {};

  profesores: any[] = [];
  profesor: any = {};

  programas: any[] = [];
  programa: any = {};

  itemEditDialog: boolean = false;
  itemDeleteDialog: boolean = false;

  submitted: boolean = false;
  crear: boolean = false;

  constructor(private materiasService: MateriasService,
    private user: AuthService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.getMaterias();
  }

  hideDialog() {
    this.itemEditDialog = false;
    this.submitted = false;
  }
  openEdit(item: any) {
    this.crear = false
    this.item = { ...item };
    this.profesor = {id:item.teacher_id,name:item.teacher}
    this.itemEditDialog = true;
    console.log(item);
  }

  deleteAlert(item: any) {
    this.itemDeleteDialog = true;
    this.item = { ...item };
  }

  openNew() {
    this.crear = true;
    this.item = {};
    this.profesor = {};
    this.programa = {};
    this.submitted = false;
    this.itemEditDialog = true;
  }

  onGlobalFilter(table: any, event: Event) {
    console.log(table, 'table', event, 'event');

    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  async deleteItem() {
    console.log(this.item);

    this.itemDeleteDialog = false;

    const valid: any = await this.materiasService.deleteItem(this.item.id);
    console.log(valid);
    if (!valid.error) {
      if (valid.status == 200) {
        this.item = {};
        this.profesor = {};
        this.getMaterias();
        this.messageService.add({ severity: 'success', summary: 'Bien!', detail: valid.message, life: 5000 });
      } else { return this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); }
    } else {
      if (valid.status != 500) { return this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrio un error!', life: 5000 }); }
    }
  }



  async editItem() {
    this.submitted = true;
    if (!this.item.name || !this.programa.id) { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Todos los campos son requeridos', life: 5000 }); return }

    let dataPost = {

       name: this.item.name,
       teacher_id: this.profesor.id,
       program_id:this.programa.id
    }
    console.log(dataPost)
    const valid: any = await this.materiasService.editItem(dataPost, this.item.id);
    console.log(valid);

    if (!valid.error) {
      if (valid.status == 201) {
        this.item = {};
        this.profesor = {};
        this.itemEditDialog = false;
        this.getMaterias();
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
    if (!this.item.name || !this.programa.id) {
      this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Todos los campos son requeridos', life: 5000 }); return
    };
    let dataPost = {

      name: this.item.name,
      teacher_id: this.profesor.id,
      program_id:this.programa.id
    }
    console.log(dataPost);
    const valid: any = await this.materiasService.saveItem(dataPost);
    console.log(valid);

    if (!valid.error) {
      if (valid.status == 201) {
        this.hideDialog();
        this.getMaterias();
        this.messageService.add({ severity: 'success', summary: 'Bien!', detail: valid.message, life: 5000 });
      } else { return this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); }
    } else {
      if (valid.status != 500) { return this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrió un error!', life: 5000 }); }
    }
  }

  async getMaterias() {

    const valid: any = await this.materiasService.getMaterias();
    console.log(valid)

    if (!valid.error) {
   
      this.datosDB = valid.data;
      this.profesores = valid.teachers;
      this.programas = valid.programs;
      if (valid.status == 200) {

      } else { return this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); }
    } else {
      if (valid.status != 500) { return this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrió un error!', life: 5000 }); }
    }
  }

}
