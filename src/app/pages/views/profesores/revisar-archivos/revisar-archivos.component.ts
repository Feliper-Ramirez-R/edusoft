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


  archivoNumero:any ;
  archivos:any[] = [];
  filter: string = '';


  constructor(private revisarArchivoService: RevisarArchivosService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    protected user: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log(this.route.snapshot.paramMap.get('id'));
    this.archivoNumero = this.route.snapshot.paramMap.get('id');
    this.getRevisionArchivo()
  }



  async getRevisionArchivo() {

    const valid: any = await this.revisarArchivoService.getRevisionArchivo(this.archivoNumero);
    console.log(valid)

    if (!valid.error) {

      this.archivos = valid.data;
      
      if (valid.status == 200) {
       

      } else { return this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); }
    } else {
      if (valid.status != 500) { return this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrió un error!', life: 5000 }); }
    }
  }

}
