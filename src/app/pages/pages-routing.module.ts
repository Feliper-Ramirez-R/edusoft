import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { HomeComponent } from './views/admin/home/home.component';
import { UsuariosComponent } from './views/admin/usuarios/usuarios.component';
import { GruposComponent } from './views/admin/grupos/grupos.component';
import { MateriasComponent } from './views/admin/materias/materias.component';
import { MisMateriasComponent } from './views/profesores/mis-materias/mis-materias.component';
import { MisProgramasComponent } from './views/alumnos/mis-programas/mis-programas.component';
import { MateriaComponent } from './views/alumnos/materia/materia.component';
import { CuestionarioComponent } from './views/alumnos/cuestionario/cuestionario.component';
import { RevisarComponent } from './views/profesores/revisar/revisar.component';
import { RevisarArchivosComponent } from './views/profesores/revisar-archivos/revisar-archivos.component';
import { NotasActividadComponent } from './views/profesores/notas-actividad/notas-actividad.component';
import { ProgramasComponent } from './views/admin/programas/programas.component';
import { EstudiantesRevisarComponent } from './views/profesores/estudiantes-revisar/estudiantes-revisar.component';
import { NotasFinalesComponent } from './views/profesores/notas-finales/notas-finales.component';
import { HomeAlumnosComponent } from './views/alumnos/home-alumnos/home-alumnos.component';
import { HomeProfesoresComponent } from './views/profesores/home-profesores/home-profesores.component';
import { HomeVisitantesComponent } from './views/home-visitantes/home-visitantes.component';




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
            path:'homealumnos',
            component: HomeAlumnosComponent,
            canActivate:[AuthGuard]
        }, 
        {
            path:'homeprofesores',
            component: HomeProfesoresComponent,
            canActivate:[AuthGuard]
        }, 
        {
            path:'homevisitantes',
            component: HomeVisitantesComponent,
            canActivate:[AuthGuard]
        }, 
        {
            path:'usuarios',
            component: UsuariosComponent,
            canActivate:[AuthGuard]
        }, 
        {
            path:'programas',
            component: ProgramasComponent,
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
            path:'mis-programas',
            component: MisProgramasComponent,
            canActivate:[AuthGuard]
        }, 
        {
            path:'materia/:id',
            component: MateriaComponent,
            canActivate:[AuthGuard]
        }, 
        {
            path:'cuestionario/:id',
            component: CuestionarioComponent,
            canActivate:[AuthGuard]
        }, 
        {
            path:'revisar/:id',
            component: RevisarComponent,
            canActivate:[AuthGuard]
        }, 
        {
            path:'revisarArchivo/:id',
            component: RevisarArchivosComponent,
            canActivate:[AuthGuard]
        }, 
        {
            path:'notasActividad/:id',
            component: NotasActividadComponent,
            canActivate:[AuthGuard]
        }, 
        {
            path:'notasFinales/:id',
            component: NotasFinalesComponent,
            canActivate:[AuthGuard]
        }, 
        {
            path:'estudiantesRevisar/:id',
            component: EstudiantesRevisarComponent,
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
