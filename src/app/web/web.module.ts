import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebRoutingModule } from './web-routing.module';
import { WebMainComponent } from './web-main/web-main.component';



@NgModule({
  declarations: [
  
    WebMainComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WebRoutingModule
  ],
  providers: [
   
  ]
})
export class WebModule { }
