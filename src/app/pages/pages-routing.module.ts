import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { HomeComponent } from './views/home/home.component';
import { UsuariosComponent } from './views/admin/usuarios/usuarios.component';




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
