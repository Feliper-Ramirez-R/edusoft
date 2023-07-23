import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] | undefined;

    constructor(public appMain: AppMainComponent) {}

    ngOnInit() {
        this.model = [
            {label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['home']},
            {
                label: 'Administrador', icon: 'pi pi-fw pi-desktop', routerLink: ['/usuarios'],
                items: [
                    {label: 'Usuarios', icon: 'pi pi-fw pi-users', routerLink: ['/pages/usuarios']},
                    {label: 'Grupos', icon: 'pi pi-fw pi-sitemap', routerLink: ['/pages/grupos']},
                    {label: 'Materias', icon: 'pi pi-fw pi-book', routerLink: ['/pages/materias']},
                   
                ]
            },
            {
                label: 'Profesores', icon: 'pi pi-fw pi-user-plus', routerLink: ['/profesores'],
                items: [
                    {label: 'Mis materias', icon: 'pi pi-fw pi-book', routerLink: ['/pages/mis-materias']}, 
                ]
            },
           /*  {
                label:'menú', icon:'pi pi-fw pi-prime', routerLink: ['/blocks'],
                items:[
                    {label: 'Pao aun no funciono', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks']},
                    {label: 'Pao aun no funciono', icon: 'pi pi-fw pi-globe', url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank'},
                ]
            },
            {
                label: 'menú', icon: 'pi pi-fw pi-copy', routerLink: ['/pages'],
                items: [
                    {label: 'Pao aun no funciono', icon: 'pi pi-fw pi-pencil', routerLink: ['/pages/crud']},
                    {label: 'Pao aun no funciono', icon: 'pi pi-fw pi-calendar-plus', routerLink: ['/pages/calendar']},
                ]
            },
            {
                label: 'Pao aun no funciono', icon: 'pi pi-fw pi-file', routerLink: ['/documentation']
            },
            {
                label: 'Pao aun no funciono', icon: 'pi pi-fw pi-money-bill', url: ['https://www.primefaces.org/store']
            } */
        ];
    }

    onMenuClick() {
        this.appMain.menuClick = true;
    }
}
