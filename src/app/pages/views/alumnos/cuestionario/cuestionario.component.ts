import { Component } from '@angular/core';
import { MateriaService } from '../materia/materia.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { CuestionarioService } from './cuestionario.service';

@Component({
  selector: 'app-cuestionario',
  templateUrl: './cuestionario.component.html',
  styleUrls: ['./cuestionario.component.scss']
})
export class CuestionarioComponent {

  cuestionario: any = [];
  idCuestionario:any

  constructor(private cuestionarioService: CuestionarioService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) { }


  ngOnInit() {

    console.log(this.route.snapshot.paramMap.get('id'));
    this.idCuestionario = this.route.snapshot.paramMap.get('id');
    this.getCuestionario()
  }

  async getCuestionario() {


    const valid: any = await this.cuestionarioService.getCuestionario(this.idCuestionario);
    console.log(valid)

    if (!valid.error) {

      this.cuestionario = valid.data
    
      if (valid.status == 200) {

      } else { return this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); }
    } else {
      if (valid.status != 500) { return this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrio un error!', life: 5000 }); }
    }
  }


  enviar(){
    console.log(this.cuestionario);
  }

}
