import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebRoutingModule } from './web-routing.module';
import { WebMainComponent } from './web-main/web-main.component';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { WebInstitutoComponent } from './web-instituto/web-instituto.component';


@NgModule({
  declarations: [
  
    WebMainComponent,
        WebInstitutoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WebRoutingModule,
    MenubarModule,
    ButtonModule
  ],
  providers: [
   
  ]
})
export class WebModule { }
