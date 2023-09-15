import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] | undefined;
    a: boolean = false
    constructor(public appMain: AppMainComponent,
                private user:AuthService) { }

    ngOnInit() {
        if(this.user.user.role == 1){
            this.model = [
                { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['home'] },
                {
                    label: 'Administrador', icon: 'pi pi-fw pi-desktop', routerLink: ['/usuarios'],
                    items: [
                        { label: 'Usuarios', icon: 'pi pi-fw pi-users', routerLink: ['/pages/usuarios'] },
                        { label: 'Programas', icon: 'pi pi-fw pi-desktop', routerLink: ['/pages/programas'] },
                        { label: 'Grupos', icon: 'pi pi-fw pi-sitemap', routerLink: ['/pages/grupos'] },
                        { label: 'Materias', icon: 'pi pi-fw pi-book', routerLink: ['/pages/materias'] },
    
                    ]
                },
                {
                    label: 'Profesores', icon: 'pi pi-fw pi-user-plus', routerLink: ['/profesores'],
                    items: [
                        { label: 'Mis materias', icon: 'pi pi-fw pi-book', routerLink: ['/pages/mis-materias'] },
                    ]
                },
                {
                    label: 'Alumnos', icon: 'pi pi-fw pi-user-plus', routerLink: ['/alumnos'],
                    items: [
                        { label: 'Mis programas', icon: 'pi pi-fw pi-book', routerLink: ['/pages/mis-programas'] },
                    ]
                },
            ];
        }
     else if(this.user.user.role == 2)
      {
        this.model = [
            { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['home'] },
            {
                label: 'Administrador', icon: 'pi pi-fw pi-desktop', routerLink: ['/usuarios'],
                items: [
                    { label: 'Usuarios', icon: 'pi pi-fw pi-users', routerLink: ['/pages/usuarios'] },
                    { label: 'Programas', icon: 'pi pi-fw pi-desktop', routerLink: ['/pages/programas'] },
                    { label: 'Grupos', icon: 'pi pi-fw pi-sitemap', routerLink: ['/pages/grupos'] },
                    { label: 'Materias', icon: 'pi pi-fw pi-book', routerLink: ['/pages/materias'] },

                ]
            },
            {
                label: 'Profesores', icon: 'pi pi-fw pi-user-plus', routerLink: ['/profesores'],
                items: [
                    { label: 'Mis materias', icon: 'pi pi-fw pi-book', routerLink: ['/pages/mis-materias'] },
                ]
            },
            {
                label: 'Alumnos', icon: 'pi pi-fw pi-user-plus', routerLink: ['/alumnos'],
                items: [
                    { label: 'Mis programas', icon: 'pi pi-fw pi-book', routerLink: ['/pages/mis-programas'] },
                ]
            },
        ];
      }else if(this.user.user.role == 4)
      {
        this.model = [
            { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['home'] },
            {
                label: 'Profesores', icon: 'pi pi-fw pi-user-plus', routerLink: ['/profesores'],
                items: [
                    { label: 'Mis materias', icon: 'pi pi-fw pi-book', routerLink: ['/pages/mis-materias'] },
                ]
            },
        ];
      }else if(this.user.user.role == 5)
      {
        this.model = [
            { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['home'] },
            {
                label: 'Alumnos', icon: 'pi pi-fw pi-user-plus', routerLink: ['/alumnos'],
                items: [
                    { label: 'Mis programas', icon: 'pi pi-fw pi-book', routerLink: ['/pages/mis-programas'] },
                ]
            },
        ];
      }

    }

    onMenuClick() {
        this.appMain.menuClick = true;
    }
}
