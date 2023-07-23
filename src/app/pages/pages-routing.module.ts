import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { HomeComponent } from './views/home/home.component';
import { UsuariosComponent } from './views/admin/usuarios/usuarios.component';
import { GruposComponent } from './views/admin/grupos/grupos.component';
import { MateriasComponent } from './views/admin/materias/materias.component';
import { MisMateriasComponent } from './views/profesores/mis-materias/mis-materias.component';




const routes: Routes = [
  { 
    path:'',
    children:[ 

        {
            path:'home',
            component: HomeComponent,
            canActivate:[AuthGuard]
        }, 
        {
            path:'usuarios',
            component: UsuariosComponent,
            canActivate:[AuthGuard]
        }, 
        {
            path:'grupos',
            component: GruposComponent,
            canActivate:[AuthGuard]
        }, 
        {
            path:'materias',
            component: MateriasComponent,
            canActivate:[AuthGuard]
        }, 
        {
            path:'mis-materias',
            component: MisMateriasComponent,
            canActivate:[AuthGuard]
        }, 

        {
            path: '**',
            redirectTo: ''
        }
    ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
