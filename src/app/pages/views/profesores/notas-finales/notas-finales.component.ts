import { Component } from '@angular/core';
import { NotasFinalesService } from './notas-finales.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-notas-finales',
  templateUrl: './notas-finales.component.html',
  styleUrls: ['./notas-finales.component.scss']
})
export class NotasFinalesComponent {

  notaFinal:any[] = [];
  filter: string = '';
  id_materia:any



  constructor(private notasFinalesService: NotasFinalesService,
    private messageService: MessageService,
    private router:Router,
    private route: ActivatedRoute,) { }


  ngOnInit() {
    console.log(this.route.snapshot.paramMap.get('id'));
    this.id_materia = this.route.snapshot.paramMap.get('id');
    this.verNotasFinales()
  }



  async verNotasFinales() {

    const valid: any = await this.notasFinalesService.verNotasFinales(this.id_materia);
    console.log(valid)

    if (!valid.error) {
       this.notaFinal = valid.data
      if (valid.status == 200) {

      } else { return this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); }
    } else {
      if (valid.status != 500) { return this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrió un error!', life: 5000 }); }
    }
  }

}
