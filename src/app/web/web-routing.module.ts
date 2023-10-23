import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebMainComponent } from './web-main/web-main.component';
import { WebInstitutoComponent } from './web-instituto/web-instituto.component';






const routes: Routes = [
    { 
        path:'',
        children:[
            /* {
                path:'webMain',
                component: WebMainComponent
            },  */
            {
                path:'webMain',
                component: WebMainComponent
            }, 
            {
                path:'webInstituto',
                component: WebInstitutoComponent
            }, 
           
        
           /*  {
                path: '**',
                redirectTo: 'home'
            } */
        ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule { }
