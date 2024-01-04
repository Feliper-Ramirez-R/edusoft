import { Component } from '@angular/core';
import { RevisarService } from './revisar.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-revisar',
  templateUrl: './revisar.component.html',
  styleUrls: ['./revisar.component.scss']
})
export class RevisarComponent {

  actividadNumero: any;
  estudiante: any;
  actividad: any[] = [];
  filter: string = '';

  constructor(private revisarService: RevisarService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    protected user: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log(this.route.snapshot.paramMap.get('id'));
    let a: any = this.route.snapshot.paramMap.get('id')?.split(",");
    this.actividadNumero = a[0];
    this.estudiante = a[1]
    this.getRevision()
  }


  async GuardarNotas() {
    console.log(this.actividad);
    const preg_buenas = this.actividad.filter((item: any) => item.nota === '1').length;

    let val_preg = 5 / this.actividad.length;
    let nota = val_preg * preg_buenas;
    console.log(nota);

    let dataPost = {
      score:nota,
      mater_id:this.actividad[0].mater_id,
      activity_id:this.actividad[0].activity_id,
      user_id:this.actividad[0].user_id
    }

    const valid: any = await this.revisarService.GuardarNotas(dataPost);
    console.log(valid)

    if (!valid.error) {

      this.actividad = valid.data;

      if (valid.status == 200) {
        this.router.navigate(['/pages/mis-materias'])
       this.messageService.add({ severity: 'success', summary: 'Bien!', detail: valid.message, life: 5000 });
      } else { return this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); }
    } else {
      if (valid.status != 500) { return this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrió un error!', life: 5000 }); }
    }

  }


  async getRevision() {

    let dataPost = {
      alumn_id: this.estudiante
    }

    console.log(dataPost);
    console.log(this.actividadNumero);
    

    const valid: any = await this.revisarService.getRevision(this.actividadNumero, dataPost);
    console.log(valid)

    if (!valid.error) {

      this.actividad = valid.data;

      if (valid.status == 200) {


      } else {
         this.router.navigate(['/pages/estudiantesRevisar/'+this.actividadNumero])
         this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); }
    } else {
      if (valid.status != 500) { return this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrió un error!', life: 5000 }); }
    }
  }


}
