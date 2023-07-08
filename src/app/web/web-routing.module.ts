import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebMainComponent } from './web-main/web-main.component';






const routes: Routes = [
    { 
        path:'',
        children:[
            {
                path:'webMain',
                component: WebMainComponent
            }, 
           /*  {
                path:'verifyuser',
                component: VerifyuserComponent
            },  */
        
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
