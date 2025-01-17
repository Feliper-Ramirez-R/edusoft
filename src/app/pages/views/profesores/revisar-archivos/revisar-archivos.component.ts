import { Component } from '@angular/core';
import { RevisarArchivosService } from './revisar-archivos.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-revisar-archivos',
  templateUrl: './revisar-archivos.component.html',
  styleUrls: ['./revisar-archivos.component.scss']
})
export class RevisarArchivosComponent {


  archivoNumero: any;
  estudiante: any;
  archivos: any[] = [];
  filter: string = '';
  calificarDialog: boolean = false;
  nota:any;
  submitted:boolean=false;


  constructor(private revisarArchivoService: RevisarArchivosService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    protected user: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log(this.route.snapshot.paramMap.get('id'));
    let a: any = this.route.snapshot.paramMap.get('id')?.split(",");
    this.archivoNumero = a[0];
    this.estudiante = a[1]
    this.getRevisionArchivo()
  }

  calificar() {
    this.calificarDialog = true
  }

  async getRevisionArchivo() {

    let dataPost = {
      alumn_id: this.estudiante
    }

    const valid: any = await this.revisarArchivoService.getRevisionArchivo(this.archivoNumero, dataPost);
    console.log(valid)

    if (!valid.error) {

      this.archivos = valid.data;

      if (valid.status == 200) {
        this.calificarDialog = false;
      
      } else { return this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); }
    } else {
      if (valid.status != 500) { return this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrió un error!', life: 5000 }); }
    }
    
  }


  async GuardarNotas() {

    let dataPost = {
      score:this.nota,
      mater_id:this.archivos[0].mater_id,
      activity_id:this.archivos[0].activity_id,
      user_id:this.estudiante
    }

    const valid: any = await this.revisarArchivoService.GuardarNotas( dataPost);
    console.log(valid)

    if (!valid.error) {

      this.archivos = valid.data;

      if (valid.status == 200) {


      } else { return this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); }
    } else {
      if (valid.status != 500) { return this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrió un error!', life: 5000 }); }
    }
    this.router.navigate(['pages/mis-materias'])
  }

}
