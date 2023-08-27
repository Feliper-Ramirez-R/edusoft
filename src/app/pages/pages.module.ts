import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './views/home/home.component';
import { UsuariosComponent } from './views/admin/usuarios/usuarios.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { MenubarModule } from 'primeng/menubar';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AvatarModule } from 'primeng/avatar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SkeletonModule } from 'primeng/skeleton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ImageModule } from 'primeng/image';
import { GalleriaModule } from 'primeng/galleria';
import { CarouselModule } from 'primeng/carousel';
import { ScrollTopModule } from 'primeng/scrolltop';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { GruposComponent } from './views/admin/grupos/grupos.component';
import { MateriasComponent } from './views/admin/materias/materias.component';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MisMateriasComponent } from './views/profesores/mis-materias/mis-materias.component';
import { MenuModule } from 'primeng/menu';
import { DataViewModule } from 'primeng/dataview';
import { OrderListModule } from 'primeng/orderlist';
import { PickListModule } from 'primeng/picklist';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MateriaComponent } from './views/alumnos/materia/materia.component';
import { MisProgramasComponent } from './views/alumnos/mis-programas/mis-programas.component';
import { DividerModule } from 'primeng/divider';
import { CheckboxModule } from 'primeng/checkbox';
import { AccordionModule } from 'primeng/accordion';
import { CuestionarioComponent } from './views/alumnos/cuestionario/cuestionario.component';
import { RevisarComponent } from './views/profesores/revisar/revisar.component';








@NgModule({
  declarations: [
    HomeComponent,
    UsuariosComponent,
    GruposComponent,
    MateriasComponent,
    MisMateriasComponent,
    MateriaComponent,
    MisProgramasComponent,
    CuestionarioComponent,
    RevisarComponent,
  ],
  imports: [
    PagesRoutingModule,
    CommonModule,
    TableModule,
    FileUploadModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    AvatarModule,
    OverlayPanelModule,
    SkeletonModule,
    SelectButtonModule,
    TooltipModule,
    ConfirmPopupModule,
    ImageModule,
    GalleriaModule,
    CarouselModule,
    ScrollTopModule,
    ScrollPanelModule,
    MenubarModule,
    PanelModule,
    PanelMenuModule,
    SplitButtonModule,
    MenuModule,
    DataViewModule,
    OrderListModule,
    PickListModule,
    InputSwitchModule,
    DividerModule,
    CheckboxModule,
    AccordionModule,
    
  ]
})
export class PagesModule { }
