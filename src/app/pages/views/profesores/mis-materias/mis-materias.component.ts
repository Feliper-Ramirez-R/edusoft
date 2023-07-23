import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { MisMateriasService } from './mis-materias.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-mis-materias',
  templateUrl: './mis-materias.component.html',
  styleUrls: ['./mis-materias.component.scss']
})
export class MisMateriasComponent {

  options: MenuItem[] = [];

  materias: any[] = [];
  materia: any = {};
  semanas: any[] = [];
  semana: any = {};
  videoDialog: boolean = false
  cuestionarioDialog: boolean = false
  archivoDialog: boolean = false
  libreDialog: boolean = false

  video: any = {};
  cuestionario: any = {};
  archivo: any = {};
  libre: any = {};

  submitted: boolean = false;
  crear: boolean = false;
  checked: boolean | undefined;
  checkedArchivo: boolean | undefined;
  checkedLibre: boolean | undefined;
  checkedCuestionario: boolean | undefined;

  archivoCapturado: any[] = [];
  archivoCapturadoBase: any[] = [];
  typefile:string = '';


  constructor(private mismateriasService: MisMateriasService,
    private messageService: MessageService,
    private sanitizer: DomSanitizer) { }


  ngOnInit() {
    this.getMisMaterias();
    this.options = [
      {
        label: 'Video', icon: 'pi pi-video', command: () => {
          this.openNewVideo();
        }
      },
      {
        label: 'Archivo', icon: 'pi pi-file-export', command: () => {
          this.openNewArchivo();
        }
      },
      {
        label: 'Cuestionario', icon: 'pi pi-check-square', command: () => {
          this.openNewArchivo();
        }
      },
      { label: 'Cuestionario libre', icon: 'pi pi-question-circle', routerLink: ['/theming'] }
    ];
    this.semanas = [
      { name: 'Semana 1', id: 1 },
      { name: 'Semana 2', id: 2 },
      { name: 'Semana 3', id: 3 },
      { name: 'Semana 4', id: 4 },
      { name: 'Semana 5', id: 5 },
      { name: 'Semana 6', id: 6 },
      { name: 'Semana 7', id: 7 },
      { name: 'Semana 8', id: 8 },
      { name: 'Semana 9', id: 9 },
      { name: 'Semana 10', id: 10 },
      { name: 'Semana 11', id: 11 },
      { name: 'Semana 12', id: 12 },
    ];
  }

  openNewVideo() {
    this.crear = true
    this.video = {};
    this.submitted = false;
    this.videoDialog = true;
  }

  openNewArchivo() {
    this.crear = true
    this.archivo = {};
    this.submitted = false;
    this.archivoDialog = true;
  }

  openEditVideo(item: any) {
    console.log(item);
    this.semana = { id: item.week_number, name: 'Semana ' + item.week_number }
    this.crear = false
    this.video = { ...item };
    item.available == 1 ? this.checked = true : false
    this.videoDialog = true;
    console.log(this.video);
  }

  openEditArchivo(item: any) {
    console.log(item);
    this.semana = { id: item.week_number, name: 'Semana ' + item.week_number }
    this.crear = false
    this.archivo = { ...item };
     item.available == 1?this.checkedArchivo = true:false
    this.archivoDialog = true;
    console.log(this.archivo);
  }

  clickMateria(materia: any) {
    this.materia = materia
  }


  async getMisMaterias() {

    const valid: any = await this.mismateriasService.getMisMaterias();
    console.log(valid)

    if (!valid.error) {
      this.materias = valid.data

      if (valid.status == 200) {

      } else { return this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); }
    } else {
      if (valid.status != 500) { return this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrio un error!', life: 5000 }); }
    }
  }


  async crearVideo() {

    this.submitted = true;

    if (!this.video.name || !this.video.url || !this.semana) { return }

    let dataPost = {
      name: this.video.name,
      mater_id: this.materia.id,
      url_class: this.video.url,
      week_number: this.semana.id
    }

    console.log(dataPost);


    const valid: any = await this.mismateriasService.crearVideo(dataPost);
    console.log(valid)

    if (!valid.error) {
      this.materias = valid.data

      if (valid.status == 201) {
        this.video = {};
        this.submitted = false;
        this.videoDialog = false;
        this.getMisMaterias();
        return this.messageService.add({ severity: 'success', summary: 'Bien!', detail: valid.message, life: 5000 }); 
      } else { return this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); }
    } else {
      if (valid.status != 500) { return this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrio un error!', life: 5000 }); }
    }
  }


  async editarVideo() {

    this.submitted = true;

    if (!this.video.name || !this.video.url_class || !this.semana.id) { return }

    let dataPost = {
      name: this.video.name,
      url_class: this.video.url_class,
      week_number: this.semana.id,
      available: this.checked
    }

    console.log(dataPost);


    const valid: any = await this.mismateriasService.editarVideo(dataPost, this.video.id);
    console.log(valid)

    if (!valid.error) {
      this.materias = valid.data

      if (valid.status == 201) {
        this.video = {};
        this.submitted = false;
        this.videoDialog = false;
        this.getMisMaterias();
        this.messageService.add({ severity: 'success', summary: 'Bien!', detail: valid.message, life: 5000 });
      } else { return this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); }
    } else {
      if (valid.status != 500) { return this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrio un error!', life: 5000 }); }
    }
  }


  async crearCuestionario() {

    this.submitted = true;

    if (!this.cuestionario.name || !this.cuestionario.url || !this.semana) { return }

    let dataPost = {
      name: this.cuestionario.name,
      mater_id: this.materia.id,
      week_number: this.semana.id
    }

    console.log(dataPost);


    const valid: any = await this.mismateriasService.crearCuestionario(dataPost);
    console.log(valid)

    if (!valid.error) {
      this.materias = valid.data

      if (valid.status == 201) {

      } else { return this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); }
    } else {
      if (valid.status != 500) { return this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrio un error!', life: 5000 }); }
    }
  }


  async crearArchivo() {

    this.submitted = true;

    if (!this.archivo.name || !this.archivo.archivo || !this.semana) { return }

    let dataPost = {
      name: this.archivo.name,
      mater_id: this.materia.id,
      week_number: this.semana.id,
      archivoBase64: this.archivoCapturadoBase[0].base64,
      fileExtension:this.typefile
    }

    console.log(dataPost);


    const valid: any = await this.mismateriasService.crearArchivo(dataPost);
    console.log(valid)

    if (!valid.error) {
      
      if (valid.status == 201) {
        this.archivo = {};
        this.submitted = false;
        this.archivoDialog = false;
        this.getMisMaterias();
        return this.messageService.add({ severity: 'success', summary: 'Bien!', detail: valid.message, life: 5000 }); 
      } else { return this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); }
    } else {
      if (valid.status != 500) { return this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrio un error!', life: 5000 }); }
    }
  }


  async editarArchivo() {

    this.submitted = true;

    if (!this.archivo.name || !this.semana) { return }

    let dataPost = {
      name: this.archivo.name,
      mater_id: this.materia.id,
      week_number: this.semana.id,
      archivoBase64: this.archivoCapturadoBase[0]?this.archivoCapturadoBase[0].base64:'',
      fileExtension:this.typefile,
      url_file:this.archivo.url_file,
      available:this.checkedArchivo
    }

    console.log(dataPost);

    const valid: any = await this.mismateriasService.editarArchivo(dataPost, this.archivo.id);
    console.log(valid)

    if (!valid.error) {
      // this.materias = valid.data

      if (valid.status == 201) {

        this.archivo = {};
        this.submitted = false;
        this.archivoDialog = false;
        this.getMisMaterias();
        return this.messageService.add({ severity: 'success', summary: 'Bien!', detail: valid.message, life: 5000 }); 

      } else { return this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); }
    } else {
      if (valid.status != 500) { return this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrio un error!', life: 5000 }); }
    }
  }


  capturarFile(event: any): any {
    this.archivoCapturado = [];
    this.archivoCapturadoBase = [];
    const fileExtension = event.target.files[0].name.split('.')[1];
    this.typefile = fileExtension;
    console.log(fileExtension)
    if (fileExtension != 'pptx' && fileExtension != 'docx' && fileExtension != 'pdf') { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Tipo de archivo incorrecto!', life: 5000 }); return; }

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


  async crearLibre() {

    this.submitted = true;

    if (!this.libre.name) { return }

    let dataPost = {
      name: this.libre.name,
      mater_id: this.materia.id,
      week_number: this.semana.id
    }

    console.log(dataPost);


    const valid: any = await this.mismateriasService.crearLibre(dataPost);
    console.log(valid)

    if (!valid.error) {
      this.materias = valid.data

      if (valid.status == 201) {

      } else { return this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); }
    } else {
      if (valid.status != 500) { return this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrio un error!', life: 5000 }); }
    }
  }

}
