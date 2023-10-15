import { Component } from '@angular/core';
import { MateriaService } from './materia.service';
import { MenuItem, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.scss']
})
export class MateriaComponent {

  idMateria: any
  options: MenuItem[] = [];
  actividades: any[] = [];
  totalActividades:any = 0;

  archivoCapturado: any[] = [];
  archivoCapturadoBase: any[] = [];
  typefile: string = '';
  archivoDialog: boolean = false;
  verNotaDialog: boolean = false;
  verNotaFinalDialog: boolean = false;
  submitted: boolean = false;
  actividad:any = {}
  nombre_materia: any = '';
  nota: any = {};
  notaFinal: any = {};
  
 

  constructor(private materiaService: MateriaService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    protected user:AuthService
  ) { }


  ngOnInit() {

    console.log(this.route.snapshot.paramMap.get('id'));
    this.idMateria = this.route.snapshot.paramMap.get('id');
    this.getActividades()
    this.options = [
     /*  {
        label: 'Profesor', icon: 'pi pi-user', command: () => {

        }
      }, */
      {
        label: 'Calificaciones', icon: 'pi pi-table', command: () => {
            this.verNotaFinal();
        }
      }
    ];
  }

 /*  clickMateria(materia: any) {
    this.materia = materia;
  } */

  openEnviarArchivo(actividad:any) {
   this.actividad = actividad;
    this.archivoDialog = true;
  }

  

  openMostrarCuestionario(actividad: any) { 
    this.router.navigate(['/pages/cuestionario',actividad.id])
  }


  capturarFile(event: any): any {
    this.archivoCapturado = [];
    this.archivoCapturadoBase = [];

    let fileExtension = event.target.files[0].name.split('.');
    fileExtension = fileExtension[fileExtension.length-1]
    this.typefile = fileExtension;
    console.log(fileExtension)
    if (fileExtension != 'pptx' && fileExtension != 'docx' && fileExtension != 'pdf'&&fileExtension != 'PPTX' && fileExtension != 'DOCX' && fileExtension != 'PDF') { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Tipo de archivo incorrecto', life: 5000 }); return; }

    this.extraerBase64(event.target.files[0]).then((imagen: any) => {

      this.archivoCapturado.push(event.target.files[0])
      this.archivoCapturadoBase.push(imagen);
    });

    console.log(this.archivoCapturado)
    console.log(this.archivoCapturadoBase)
  }

  extraerBase64 = async ($event: any) => new Promise((resolve): void => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base64: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };
    } catch (e) {
      return;
    }
  })


  async verNota(actividad:any) {
    console.log(actividad);
     
    let dataPost = {
      mater_id:this.idMateria,
      activity_id:actividad.id
    }

    const valid: any = await this.materiaService.verNota(dataPost);
    console.log(valid);

    if (!valid.error) {
      this.nota = valid
      if (valid.status == 200) {
        this.verNotaDialog = true;

      } else { return this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); }
    } else {
      if (valid.status != 500) { return this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrió un error!', life: 5000 }); }
    }
  }


  async verNotaFinal() {
    console.log(this.idMateria);
    
    

    const valid: any = await this.materiaService.verNotaFinal(this.idMateria);
    console.log(valid)

    if (!valid.error) {
  
      this.notaFinal = valid.data
      
      if (valid.status == 200) {
        this.verNotaFinalDialog = true;

      } else { return this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); }
    } else {
      if (valid.status != 500) { return this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrió un error!', life: 5000 }); }
    }
  }


  async getActividades() {

    const valid: any = await this.materiaService.getActividades(this.idMateria);
    console.log(valid)

    if (!valid.error) {
  
      this.nombre_materia = valid.mater_name
      this.actividades = valid.weeks
      this.totalActividades = valid.count
      if (valid.status == 200) {

        /* ordenar las semanas */
        valid.weeks.sort(function (a: any, b: any) {
          if (a.week < b.week) {
            return 1;
          }
          if (a.week > b.week) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });

      } else { return this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); }
    } else {
      if (valid.status != 500) { return this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrio un error!', life: 5000 }); }
    }
  }


  async subirArchivo() {

    this.submitted = true;

    if(!this.actividad.archivo){this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Selecciona un archivo!', life: 5000 });return}


   let dataPost = {
    archivoBase64: this.archivoCapturadoBase[0].base64,
    fileExtension: this.typefile,
     activity_id:this.actividad.id
    }

    console.log(dataPost);
    
    const valid: any = await this.materiaService.subirArchivo(dataPost);
    console.log(valid)

    if (!valid.error) {
  
      if (valid.status == 201) {
        this.archivoDialog = false;
        this.submitted = false;
        this.getActividades();
        this.messageService.add({ severity: 'success', summary: 'Info!', detail: valid.message, life: 5000 });
      } else { return this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); }
    } else {
      if (valid.status != 500) { return this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrió un error!', life: 5000 }); }
    }
  }

}
