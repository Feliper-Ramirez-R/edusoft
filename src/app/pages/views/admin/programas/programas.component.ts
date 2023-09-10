import { Component } from '@angular/core';
import { ProgramasService } from './programas.service';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-programas',
  templateUrl: './programas.component.html',
  styleUrls: ['./programas.component.scss']
})
export class ProgramasComponent {

  datosDB: any[] = [];
  item: any = {};

  itemEditDialog: boolean = false;
  itemDeleteDialog: boolean = false;
  submitted: boolean = false;
  crear: boolean = false;

  constructor(private programasService: ProgramasService,
    private user: AuthService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.getProgramas();
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
    this.crear = false
    this.item = { ...item };
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
    this.submitted = false;
    this.itemEditDialog = true;
  }


  async deleteItem() {
    console.log(this.item);

    this.itemDeleteDialog = false;

    const valid: any = await this.programasService.deleteItem(this.item.id);
    console.log(valid);
    if (!valid.error) {
      if (valid.status == 200) {
        this.item = {};
        this.getProgramas();
        this.messageService.add({ severity: 'success', summary: 'Bien!', detail: valid.message, life: 5000 });
      } else { return this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); }
    } else {
      if (valid.status != 500) { return this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrió un error!', life: 5000 }); }
    }
  }



  async editItem() {
    this.submitted = true;
    if (!this.item.name) { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Todos los campos son requeridos', life: 5000 }); return }

    let dataPost = {

       name: this.item.name,

    }
    console.log(dataPost)
    const valid: any = await this.programasService.editItem(dataPost, this.item.id);
    console.log(valid);

    if (!valid.error) {
      if (valid.status == 201) {
        this.item = {};
        this.itemEditDialog = false;
        this.getProgramas();
        this.messageService.add({ severity: 'success', summary: 'Bien!', detail: valid.message, life: 5000 });
      } else { return this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); }
    } else {
      if (valid.status != 500) { return this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrió un error!', life: 5000 }); }
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
  
    }
    console.log(dataPost);
    const valid: any = await this.programasService.saveItem(dataPost);
    console.log(valid);

    if (!valid.error) {
      if (valid.status == 201) {
        this.hideDialog();
        this.getProgramas();
        this.messageService.add({ severity: 'success', summary: 'Bien!', detail: valid.message, life: 5000 });
      } else { return this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); }
    } else {
      if (valid.status != 500) { return this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrió un error!', life: 5000 }); }
    }
  }

  async getProgramas() {

    const valid: any = await this.programasService.getprogramas();
    console.log(valid)

    if (!valid.error) {
     
      this.datosDB = valid.data
      if (valid.status == 200) {

      } else { return this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); }
    } else {
      if (valid.status != 500) { return this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrió un error!', life: 5000 }); }
    }
  }

}