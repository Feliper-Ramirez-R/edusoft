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

  actividadNumero:any ;
  actividad:any[] = [];
  
  constructor(private revisarService: RevisarService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    protected user: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log(this.route.snapshot.paramMap.get('id'));
    this.actividadNumero = this.route.snapshot.paramMap.get('id');
    this.getRevision()
  }

  async getRevision() {

    const valid: any = await this.revisarService.getRevision(this.actividadNumero);
    console.log(valid)

    if (!valid.error) {

      this.actividad = valid.data;
      
      if (valid.status == 200) {
       

      } else { return this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); }
    } else {
      if (valid.status != 500) { return this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrió un error!', life: 5000 }); }
    }
  }

}
