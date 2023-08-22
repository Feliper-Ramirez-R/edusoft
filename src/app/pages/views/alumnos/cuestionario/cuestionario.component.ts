import { Component, ElementRef, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { CuestionarioService } from './cuestionario.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cuestionario',
  templateUrl: './cuestionario.component.html',
  styleUrls: ['./cuestionario.component.scss']
})
export class CuestionarioComponent {

  fecha:any = new Date().toLocaleString("es-ES",{day: "2-digit", month: "long", year: "numeric"});

  iniciarIntento: boolean = false;
  tiempoDialog: boolean = false;
  actividad:any = {};
  totalPreguntas:Number = 0;

  minutos: number = 0;
  segundos: number = 0;
  interval: any;

  cuestionario: any = [];
  idCuestionario:any


  constructor(private cuestionarioService: CuestionarioService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    protected user:AuthService,
    private router:Router
  ) {}


  ngOnInit() {
    console.log(this.route.snapshot.paramMap.get('id'));
    this.idCuestionario = this.route.snapshot.paramMap.get('id');
    this.getCuestionario()
  }

  


  startCountdown() {
    this.iniciarIntento = true;
    // this.minutos = this.actividad.duration;
    this.minutos =1;
    this.segundos = 0;

    this.interval = setInterval(() => {
      if (this.segundos > 0) {
        this.segundos--;
      } else {
        if (this.minutos > 0) {
          this.minutos--;
          this.segundos = 59;
        } else {
          this.enviarCuestionario();
          this.iniciarIntento = false;
          this.tiempoDialog = true;
          clearInterval(this.interval);
        }
      }
    }, 1000);
  }


  ngOnDestroy() {
    clearInterval(this.interval);
  }

  async getCuestionario() {

    const valid: any = await this.cuestionarioService.getCuestionario(this.idCuestionario);
    console.log(valid)

    if (!valid.error) {

      this.cuestionario = valid.data.questions;
      this.actividad = valid.data.activity[0];
      this.totalPreguntas = valid.data.count;
    
      if (valid.status == 200) {

      } else { return this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); }
    } else {
      if (valid.status != 500) { return this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrio un error!', life: 5000 }); }
    }
  }

  async enviarCuestionario() {

console.log(this.cuestionario);return

    let dataPost = {
      data: {
       cue:this.cuestionario
      }
    }
    console.log(dataPost);
    const valid: any = await this.cuestionarioService.enviarCuestionario();
    console.log(valid)
    if (!valid.error) {
      if (valid.status == 201) {
       


        this.messageService.add({ severity: 'success', summary: 'Bien!', detail: valid.message, life: 5000 });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Ups!', detail: valid.message, life: 5000 });
      }
    } else {
      if (valid.status != 500) { return this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrio un error!', life: 5000 }); }
    }

  }

}
