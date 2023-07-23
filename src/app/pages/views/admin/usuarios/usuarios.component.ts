import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UsuariosService } from './usuarios.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {

  datosDB: any[] = [];
  item: any = {};

  perfiles: any[] = [{ id: 2, name: 'ADMIN' },
  //  {id:3,name:'Coordinador'}, 
  { id: 4, name: 'DOCENTE' },
  { id: 5, name: 'ALUMNO' },
  { id: 6, name: 'VISITANTE' }
  ];
  perfil: any = {};



  itemEditDialog: boolean = false;
  itemDeleteDialog: boolean = false;
  submitted: boolean = false;
  crear: boolean = false;

  constructor(private usuarioService: UsuariosService,
    private user: AuthService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.getUsuarios();
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
    this.perfil = { id: item.role, name: item.role_name }
    this.crear = false
    this.item = { ...item };
    this.itemEditDialog = true;
    console.log(item);
    console.log(this.perfil);
  }

  deleteAlert(item: any) {
    this.itemDeleteDialog = true;
    this.item = { ...item };
  }

  openNew() {
    this.crear = true;
    this.item = {};
    this.perfil = {}
    this.submitted = false;
    this.itemEditDialog = true;
  }


  async deleteItem() {
    console.log(this.item);

    this.itemDeleteDialog = false;

    const valid: any = await this.usuarioService.deleteItem(this.item.id);
    console.log(valid);

    if (!valid.error) {

      if (valid.status == 200) {
        this.item = {};
        this.getUsuarios();
        this.messageService.add({ severity: 'success', summary: 'Bien!', detail: valid.message, life: 5000 });
      } else { return this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); }
    } else {
      if (valid.status != 500) { return this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrio un error!', life: 5000 }); }
    }
  }



  async editItem() {
    this.submitted = true;
    if (!this.item.name || !this.item.dni || !this.item.email || !this.perfil.id) { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Todos los campos son requeridos', life: 5000 }); return }

    let dataPost = {

      name: this.item.name,
      dni: String(this.item.dni),
      role: this.perfil.id,
      email: this.item.email

    }
    console.log(dataPost)
    const valid: any = await this.usuarioService.editItem(dataPost, this.item.id);
    console.log(valid);

    if (!valid.error) {

      if (valid.status == 201) {
        this.item = {};
        this.itemEditDialog = false;
        this.getUsuarios();
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
    if (Object.values(this.item).length < 3 || !this.perfil.id) {
      this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Todos los campos son requeridos', life: 5000 }); return
    };
    let dataPost = {

      name: this.item.name,
      dni: String(this.item.dni),
      role: this.perfil.id,
      email: this.item.email,

    }
    console.log(dataPost);
    const valid: any = await this.usuarioService.saveItem(dataPost);
    console.log(valid);

    if (!valid.error) {

      if (valid.status == 201) {
        this.hideDialog();
        this.getUsuarios();
        this.messageService.add({ severity: 'success', summary: 'Bien!', detail: valid.message, life: 5000 });
      } else { return this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); }
    } else {
      if (valid.status != 500) { return this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrio un error!', life: 5000 }); }
    }
  }

  async getUsuarios() {

    const valid: any = await this.usuarioService.getUsuarios();
    console.log(valid);

    if (!valid.error) {
      this.datosDB = valid.data
      if (valid.status == 200) {

      } else { return this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); }
    } else {
      if (valid.status != 500) { return this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrio un error!', life: 5000 }); }
    }
  }
}
