import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { MisMateriasService } from './mis-materias.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-materias',
  templateUrl: './mis-materias.component.html',
  styleUrls: ['./mis-materias.component.scss']
})
export class MisMateriasComponent {

  stateOptions: any[] = [{label: 'NO', value: 'off'}, {label: 'SI', value: 'on'}];

  value: string = 'off';

  options: MenuItem[] = [];
  MostrarCuestionario: any = [];

  materias: any[] = [];
  materia: any = {};

  semanas: any[] = [];
  semana: any = {};

  grupos: any[] = [];
  grupo: any = {};

  videoDialog: boolean = false
  cuestionarioDialog: boolean = false
  archivoDialog: boolean = false
  libreDialog: boolean = false
  preguntasDialog: boolean = false
  preguntaDeleteDialog: boolean = false
  mostrarCuestionarioDialog: boolean = false


  video: any = {};
  cuestionario: any = {};
  archivo: any = {};
  libre: any = {};

  submitted: boolean = false;
  submittedPregunta: boolean = false;
  submittedPreguntaLibre: boolean = false;
  submittedAdicPregunta: boolean = false;
  crear: boolean = false;
  crearPregunta: boolean = false;

  checked: boolean | undefined;
  checkedArchivo: boolean | undefined;
  checkedLibre: boolean | undefined;
  checkedCuestionario: boolean | undefined;

  archivoCapturado: any[] = [];
  archivoCapturadoBase: any[] = [];
  typefile: string = '';

  tiempos: any[] = [
    { id: 10, name: '10 minutos' },
    { id: 20, name: '20 minutos' },
    { id: 30, name: '30 minutos' },
    { id: 40, name: '40 minutos' },
    { id: 50, name: '50 minutos' },
    { id: 60, name: '60 minutos' },
    { id: 70, name: '70 minutos' },
    { id: 80, name: '80 minutos' },
    { id: 90, name: '90 minutos' },
    { id: 100, name: '100 minutos' },
    { id: 110, name: '110 minutos' },
    { id: 120, name: '120 minutos' },
  ];
  tiempo: any = {};

  preguntas: any[] = [];
  pregunta: any = {};

  preguntasLibres: any[] = [];
  preguntaLibre: any = {};

  respuestas: any[] = [
    { id: 'a', name: 'Opcion A' },
    { id: 'b', name: 'Opcion B' },
    { id: 'c', name: 'Opcion C' },
    { id: 'd', name: 'Opcion D' }
  ];
  respuesta: any = {};

  constructor(private mismateriasService: MisMateriasService,
    private messageService: MessageService,
    private sanitizer: DomSanitizer,
    private router:Router) { }


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
          this.openNewCuestionario();
        }
      },
      {
        label: 'Cuestionario libre', icon: 'pi pi-question-circle', command: () => {
          this.openNewLibre();
        }
      },
      {
        label: 'Ver notas materia ', icon: 'pi pi-book', command: () => {
          this.openVerNotasFinales();
        }
      }
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


  openEstudiantesRevisar(actividad: any) {
    console.log(actividad);

    this.router.navigate(['/pages/estudiantesRevisar',actividad.id])
  }


  openVerNotasFinales() {
    console.log(this.materia);

    this.router.navigate(['/pages/notasFinales',this.materia.id])
  }


  openVerNotasActividad(actividad: any) {
    console.log(actividad);

    this.router.navigate(['/pages/notasActividad',actividad.id])
  }


  agregarPregunta() {
    console.log(this.pregunta);

    this.submittedPregunta = true
    if (Object.values(this.pregunta).length < 5) {
      this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Campos requeridos', life: 5000 }); return
    };
    this.submittedPregunta = false
    this.pregunta.respuesta = this.respuesta.id

    this.preguntas.push(this.pregunta)
    console.log(this.preguntas);
    this.pregunta = {}
    this.respuesta = {}
  }

  agregarPreguntaLibre() {
    console.log(this.preguntaLibre);

    this.submittedPreguntaLibre = true
    if (Object.values(this.preguntaLibre).length < 1) {
      this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ingresa una pregunta', life: 5000 }); return
    };
    this.submittedPreguntaLibre = false

    this.preguntasLibres.push(this.preguntaLibre)
    console.log(this.preguntasLibres);
    this.preguntaLibre = {}
  }

  openMostrarCuestionario(actividad: any) {
    this.MostrarCuestionario = actividad.questions
    this.mostrarCuestionarioDialog = true;
    console.log(this.MostrarCuestionario);
  }

  openNewVideo() {
    this.crear = true
    this.video = {};
    this.submitted = false;
    this.videoDialog = true;
    this.semana = {};
    this.grupo = {};
  }

  openNewArchivo() {
    this.crear = true
    this.archivo = {};
    this.submitted = false;
    this.archivoDialog = true;
    this.semana = {};
    this.grupo = {};
  }

  openNewCuestionario() {
    this.crear = true
    this.cuestionario = {};
    this.submitted = false;
    this.cuestionarioDialog = true;
    this.tiempo = {};
    this.grupo = {};
    this.semana = {};
  }

  openNewLibre() {
    this.crear = true
    this.libre = {};
    this.submitted = false;
    this.libreDialog = true;
    this.tiempo = {};
    this.grupo = {};
    this.semana = {};
  }

  openNewPregunta() {
    this.crearPregunta = true
    // this.cuestionario = {};
    this.submittedAdicPregunta = false;
    this.preguntasDialog = true;
  }

  openEditVideo(item: any) {
    console.log(item);
    this.semana = { id: item.week_number, name: 'Semana ' + item.week_number };
    this.grupo = { id: item.grupe_id, name: item.grupe_name };
    this.crear = false
    this.video = { ...item };
    item.available == 1 ? this.checked = true : false
    this.videoDialog = true;
    console.log(this.video);
  }

  openEditArchivo(item: any) {
    console.log(item);
    this.semana = { id: item.week_number, name: 'Semana ' + item.week_number };
    // this.grupo = { id: item.grupe_id, name:item.grupe_name };
    this.grupo = item.group;
    this.crear = false
    this.archivo = { ...item };
    item.available == 1 ? this.checkedArchivo = true : false
    this.archivoDialog = true;
    console.log(this.archivo);
    item.resend == 1 ? this.value = 'on' : 'off';
  }

  openEditCuestionario(item: any) {
    console.log(item);
    this.semana = { id: item.week_number, name: 'Semana ' + item.week_number }
    this.grupo = { id: item.grupe_id, name: item.grupe_name };
    this.tiempo = { id: item.duration, name: item.duration + ' minutos' }
    this.crear = false
    this.cuestionario = { ...item };
    item.available == 1 ? this.checkedCuestionario = true : false
    this.cuestionarioDialog = true;
    console.log(this.cuestionario);
  }

  openEditLibre(item: any) {
    console.log(item);
    this.semana = { id: item.week_number, name: 'Semana ' + item.week_number }
    // this.grupo = { id: item.grupe_id, name:item.grupe_name };
    this.grupo = item.group
    this.tiempo = { id: item.duration, name: item.duration + ' minutos' }
    this.crear = false
    this.libre = { ...item };
    item.available == 1 ? this.checkedLibre = true : false
    this.libreDialog = true;
    console.log(this.libre);
  }

  openEditPregunta(item: any) {
    console.log(item);
    // this.semana = { id: item.week_number, name: 'Semana ' + item.week_number }
    this.crearPregunta = false
    // this.cuestionario = { ...item };
    // item.available == 1 ? this.checkedArchivo = true : false
    this.preguntasDialog = true;
    console.log(this.cuestionario);
  }

  deleteAlert(item: any) {
    this.preguntaDeleteDialog = true;
    // this.item = { ...item };
  }

  clickMateria(materia: any) {
    this.materia = materia
  }


  async getMisMaterias() {

    const valid: any = await this.mismateriasService.getMisMaterias();
    console.log(valid)

    if (!valid.error) {

    
      this.materias = valid.data;
      this.grupos = valid.groups;

      if (valid.status == 200) {
        /* ordenar las semanas */
        valid.data.forEach((element:any) => {
          element.weeks.sort(function (a: any, b: any) {
            if (a.week < b.week) {
              return 1;
            }
            if (a.week > b.week) {
              return -1;
            }
            return 0;
          });
         });

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
      group: this.grupo.id,
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
      group: this.grupo.id,
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

    console.log(this.cuestionario);

    if (!this.cuestionario.name || !this.cuestionario.attempts || !this.semana || !this.tiempo.id || !this.grupo.id) {
      this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Campos requeridos', life: 5000 }); return
    };

    if (this.preguntas.length == 0) {
      this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Debes agregar minimo una pregunta', life: 5000 }); return
    }


    let dataPost = {
      group: this.grupo.id,
      name: this.cuestionario.name,
      attempts: this.cuestionario.attempts,
      duration: this.tiempo.id,
      week_number: this.semana.id,
      mater_id: this.materia.id,
      questions: this.preguntas
    }

    console.log(dataPost);


    const valid: any = await this.mismateriasService.crearCuestionario(dataPost);
    console.log(valid)

    if (!valid.error) {
      this.materias = valid.data

      if (valid.status == 201) {
        this.cuestionario = {};
        this.submitted = false;
        this.cuestionarioDialog = false;
        this.getMisMaterias();
        return this.messageService.add({ severity: 'success', summary: 'Bien!', detail: valid.message, life: 5000 });

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
      group: this.grupo.id,
      name: this.archivo.name,
      mater_id: this.materia.id,
      week_number: this.semana.id,
      archivoBase64: this.archivoCapturadoBase[0].base64,
      fileExtension: this.typefile,
      resend:this.value == 'on'? true:false
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
      group: this.grupo.id,
      name: this.archivo.name,
      mater_id: this.materia.id,
      week_number: this.semana.id,
      archivoBase64: this.archivoCapturadoBase[0] ? this.archivoCapturadoBase[0].base64 : '',
      fileExtension: this.typefile,
      url_file: this.archivo.url_file,
      available: this.checkedArchivo,
      resend:this.value == 'on'? true:false
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


  async editarCuestionario() {

    this.submitted = true;

    if (!this.cuestionario.name || !this.cuestionario.attempts || !this.semana || !this.tiempo.id || !this.grupo.id) {
      this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Campos requeridos', life: 5000 }); return
    };

    let dataPost = {
      group: this.grupo.id,
      name: this.cuestionario.name,
      attempts: this.cuestionario.attempts,
      duration: this.tiempo.id,
      week_number: this.semana.id,
      available: this.checkedCuestionario
    }

    console.log(dataPost);


    const valid: any = await this.mismateriasService.editarCuestionario(dataPost, this.cuestionario.id);
    console.log(valid)

    if (!valid.error) {
      this.materias = valid.data

      if (valid.status == 201) {

        this.cuestionario = {};
        this.submitted = false;
        this.cuestionarioDialog = false;
        this.getMisMaterias();
        this.messageService.add({ severity: 'success', summary: 'Bien!', detail: valid.message, life: 5000 });
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

    console.log(this.libre);

    if (!this.libre.name || !this.libre.attempts || !this.semana || !this.tiempo.id || !this.grupo.id) {
      this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Campos requeridos', life: 5000 }); return
    };

    if (this.preguntasLibres.length == 0) {
      this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Debes agregar minimo una pregunta', life: 5000 }); return
    }

    let dataPost = {
      group: this.grupo.id,
      name: this.libre.name,
      attempts: this.libre.attempts,
      duration: this.tiempo.id,
      week_number: this.semana.id,
      mater_id: this.materia.id,
      questions: this.preguntasLibres
    }

    console.log(dataPost);


    const valid: any = await this.mismateriasService.crearLibre(dataPost);
    console.log(valid)

    if (!valid.error) {
      this.materias = valid.data

      if (valid.status == 201) {
        this.libre = {};
        this.submitted = false;
        this.libreDialog = false;
        this.getMisMaterias();
        return this.messageService.add({ severity: 'success', summary: 'Bien!', detail: valid.message, life: 5000 });

      } else { return this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); }
    } else {
      if (valid.status != 500) { return this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrio un error!', life: 5000 }); }
    }
  }


  async editarLibre() {

    this.submitted = true;

    if (!this.libre.name || !this.libre.attempts || !this.semana || !this.tiempo.id || !this.grupo.id) {
      this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Campos requeridos', life: 5000 }); return
    };

    let dataPost = {
      group: this.grupo.id,
      name: this.libre.name,
      attempts: this.libre.attempts,
      duration: this.tiempo.id,
      week_number: this.semana.id,
      available: this.checkedLibre
    }

    console.log(dataPost);


    const valid: any = await this.mismateriasService.editarLibre(dataPost, this.libre.id);
    console.log(valid)

    if (!valid.error) {
      this.materias = valid.data

      if (valid.status == 201) {

        this.libre = {};
        this.submitted = false;
        this.libreDialog = false;
        this.getMisMaterias();
        this.messageService.add({ severity: 'success', summary: 'Bien!', detail: valid.message, life: 5000 });
      } else { return this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); }
    } else {
      if (valid.status != 500) { return this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrio un error!', life: 5000 }); }
    }
  }


  async adicionarPregunta() {

    this.submittedAdicPregunta = true;

    // if (!this.libre.name) { return }

    let dataPost = {
      name: this.libre.name,
      mater_id: this.materia.id,
      week_number: this.semana.id
    }

    console.log(dataPost);


    const valid: any = await this.mismateriasService.adicionarPregunta(dataPost);
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

  async editarPregunta() {

    this.submittedAdicPregunta = true;

    if (!this.cuestionario.name || !this.cuestionario.url || !this.semana) { return }

    let dataPost = {
      name: this.cuestionario.name,
      mater_id: this.materia.id,
      week_number: this.semana.id
    }

    console.log(dataPost);


    const valid: any = await this.mismateriasService.editarPregunta(dataPost);
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


  async deletePregunta() {


    const valid: any = await this.mismateriasService.deletePregunta('dataPost');
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
