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

   

    perfiles: any[] = [{id:2,name:'ADMIN'},
                      //  {id:3,name:'Coordinador'}, 
                       {id:4,name:'DOCENTE'}, 
                       {id:5,name:'ALUMNO'}, 
                       {id:6,name:'VISITANTE'}
                      ];
    perfil: any = {};
    selectedItems: any[] = [];
    

    itemEditDialog: boolean = false;
    itemDeleteDialog: boolean = false;
    itemsDeleteDialog: boolean = false;
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

    alertSelectedItems() {
        this.itemsDeleteDialog = true;
    }


    hideDialog() {
        this.itemEditDialog = false;
        this.submitted = false;
    }
    openEdit(item: any) {
      this.perfil = {id:item.role,name:item.role_name}
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
        this.perfil ={}
        this.submitted = false;
        this.itemEditDialog = true;
    }


   /*  async deleteItem() {
        console.log(this.item);

        this.itemDeleteDialog = false;

        const valid: any = await this.usuarioService.deleteItem(this.item.id);
        console.log(valid)
        if (valid) {
            if (valid.status == 200) {
                this.item = {};
                this.getUsuarios();
                this.messageService.add({ severity: 'success', summary: 'Bien!', detail: valid.message, life: 5000 });
            } else
                this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.message, life: 5000 });
        } else {
            this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrio un error', life: 5000 });
        }
    } */



  /*   async deleteSelectedItems() {

        console.log(this.selectedItems);
        this.itemsDeleteDialog = false;

        var ids: any = [];
        await this.selectedItems.forEach((element: any) => {
            ids.push(element.id)
        });

        let dataPost = {
            data: {
                ids: ids
            }
        }
        console.log(dataPost)
        const valid: any = await this.usuarioService.deleteSelectedItems(dataPost);
        console.log(valid)
        if (valid) {
            if (valid.status == 200) {
                this.selectedItems = [];
                this.getUsuarios();
                this.messageService.add({ severity: 'success', summary: 'Bien!', detail: valid.message, life: 5000 });
            }
        } else {
            this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrio un error', life: 5000 });
        }
    } */



    async editItem() {

        this.itemDeleteDialog = false;

        let dataPost = {
            data: {
                name: this.item.name,
                byUser: this.user.user.id,
                address: this.item.address,
                dni: String(this.item.dni),
                username: this.item.username,
                phone_number: String(this.item.phone_number),
                city: this.item.city,
                email: this.item.email
            }
        }
        console.log(dataPost)
        const valid: any = await this.usuarioService.editItem(dataPost, this.item.id);
        console.log(valid)
        if (valid) {
            if (valid.status == 201) {
                this.item = {};
                this.itemEditDialog = false;
                this.getUsuarios();
                this.messageService.add({ severity: 'success', summary: 'Bien!', detail: valid.message, life: 5000 });
            } else {
                this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.message, life: 5000 });
            }
        } else {
            this.messageService.add({ severity: 'error', summary: 'Ups!', detail: valid.message, life: 5000 });
        }
    }


    async saveItem() {
        console.log(this.item, 'crear');

        this.submitted = true;
        if (!this.item.name) { return }
        let dataPost = {
            data: {
                name: this.item.name,
                byUser: this.user.user.id,
                address: this.item.address,
                dni: String(this.item.dni),
                username: this.item.username,
                phone_number: String(this.item.phone_number),
                city: this.item.city,
                email: this.item.email
            }
        }
        console.log(dataPost);
        const valid: any = await this.usuarioService.saveItem(dataPost);
        console.log(valid)
        if (valid) {
            if (valid.status == 201) {
                this.hideDialog();
                this.getUsuarios();
                this.messageService.add({ severity: 'success', summary: 'Bien!', detail: valid.message, life: 5000 });
            } else {
                this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.message, life: 5000 });
            }

        } else {
            this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrio un error!', life: 5000 });
        }
    }

    async getUsuarios() {

        const valid: any = await this.usuarioService.getUsuarios();
        console.log(valid)
        if (valid) {
            this.datosDB = valid.data
            if (valid.status !== 200) {
                this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.message, life: 5000 });
            }
        } else {
            this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrio un error!', life: 5000 });
        }
    }
}
