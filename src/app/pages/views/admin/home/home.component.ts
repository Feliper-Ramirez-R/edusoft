import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HomeService } from './home.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import esLocale from '@fullcalendar/core/locales/es'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  events: any[] = [];

  today: string = '';

  showDialog: boolean = false;
  itemDeleteDialog: boolean = false;
  clickedEvent: any = null;
  dateClicked: boolean = false;
  edit: boolean = false;
  tags: any[] = [];
  view: string = '';
  changedEvent: any;

  calendarOptions: any = {
    initialView: 'dayGridMonth'
  };

  users_in_line: any[] = [];
  actividades_pendientes: any[] = [];

  constructor(protected user: AuthService,
    private homeService: HomeService,
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit() {
    this.today = new Date().toISOString().split('T')[0];
    this.getUsersOnline();
    this.getEventos();

    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      locale: esLocale,
      height: 500,
      initialDate: this.today,
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: '',
      },
      datesSet: (info: any) => {
        const month1 = info.view.currentStart.getMonth() + 1; // Obtén el mes actual (0-11)
        const year = info.view.currentStart.getFullYear(); // Obtén el año actual
        const month2 = ('0' + month1).slice(-2);
        console.log(month2);
        console.log(year);
      },
      editable: false,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      eventClick: (e: MouseEvent) => this.onEventClick(e),
      select: (e: MouseEvent) => this.onDateSelect(e)
    };
  }


  openMostrarCuestionario(actividad: any) {
    console.log(actividad);

    this.router.navigate(['/pages/cuestionario', actividad.id])
  }

  async getUsersOnline() {

    const valid: any = await this.homeService.getUsersOnline();
    console.log(valid);

    if (!valid.error) {

      this.users_in_line = valid.data;

      if (valid.status == 200) {

        // this.messageService.add({ severity: 'success', summary: 'Bien!', detail: valid.message, life: 5000 });
      } else { return /* this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); */ }
    } else {
      if (valid.status != 500) { return this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrió un error!', life: 5000 }); }
    }
  }



  async getEventos() {

    const valid: any = await this.homeService.getEventos();
    console.log(valid);

    if (!valid.error) {

      this.events = valid.data;

      if (valid.status == 200) {

        // this.messageService.add({ severity: 'success', summary: 'Bien!', detail: valid.message, life: 5000 });

      } else { return /* this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); */ }
    } else {
      if (valid.status != 500) { return /* this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); */ }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrió un error!', life: 5000 }); }
    }
  }


  /* Calendario */

  onEventClick(e: any) {
 
    this.clickedEvent = e.event;
    let plainEvent = e.event.toPlainObject({ collapseExtendedProps: true, collapseColor: true });
    this.view = 'display';
    this.showDialog = true;

    this.changedEvent = { ...plainEvent, ...this.clickedEvent };
    this.changedEvent.start = this.clickedEvent.start;
    this.changedEvent.end = this.clickedEvent.end ? this.clickedEvent.end : this.clickedEvent.start;
  }

  onDateSelect(e: any) {
    this.view = 'new'
    this.showDialog = true;
    this.changedEvent = { ...e, title: null, description: null, location: null };
  }

  async guardarEvento() {
    /*  if (!this.validate()) {
       return;
     } */

    let fecha1 = new Date(this.changedEvent.start).toISOString().split('T')[0];
    let fecha2 = new Date(this.changedEvent.end).toISOString().split('T')[0];


    let dataPost = {
      date_from: fecha1,
      date_to: fecha2,
      content: this.changedEvent.title,
      description: this.changedEvent.description
    }

    console.log(dataPost);


    const valid: any = await this.homeService.guardarEvento(dataPost);
    console.log(valid);

    if (!valid.error) {


      if (valid.status == 201) {
        this.changedEvent = {};
        this.showDialog = false;
        this.getEventos();
        this.messageService.add({ severity: 'success', summary: 'Bien!', detail: valid.message, life: 5000 });
      } else { return /* this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); */ }
    } else {
      if (valid.status != 500) { return /* this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); */ }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrió un error!', life: 5000 }); }
    }

  }


  async editarEvento() {


    let fecha1 = new Date(this.changedEvent.start).toISOString().split('T')[0];
    let fecha2 = new Date(this.changedEvent.end).toISOString().split('T')[0];


    let dataPost = {
      date_from: fecha1,
      date_to: fecha2,
      content: this.changedEvent.title,
      description: this.changedEvent.description,
      id:this.changedEvent.id
    }

    console.log(dataPost);


    const valid: any = await this.homeService.editarEvento(dataPost);
    console.log(valid);

    if (!valid.error) {


      if (valid.status == 201) {
        this.changedEvent = {};
        this.showDialog = false;
        this.getEventos();
        this.messageService.add({ severity: 'success', summary: 'Bien!', detail: valid.message, life: 5000 });
      } else { return /* this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); */ }
    } else {
      if (valid.status != 500) { return /* this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); */ }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrió un error!', life: 5000 }); }
    }

  }

  onEditClick() {
    this.view = 'edit';
  }

  async delete(evento:any) {
    
    const valid: any = await this.homeService.eliminarEvento(evento.id);
    console.log(valid);

    if (!valid.error) {


      if (valid.status == 200) {
        this.changedEvent = {};
        this.itemDeleteDialog = false;
        this.getEventos();
        this.messageService.add({ severity: 'success', summary: 'Bien!', detail: valid.message, life: 5000 });
      } else { return this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); }
    } else {
      if (valid.status != 500) { return /* this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); */ }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrió un error!', life: 5000 }); }
    }
  }

  deleteModal(evento:any) {
    console.log(evento);
    this.showDialog = false;
    this.itemDeleteDialog = true;
  }

  

  /*  validate() {
     let { start, end } = this.changedEvent;
     return start && end;
   } */

}
