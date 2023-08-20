import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MisProgramasService } from './mis-programas.service';

@Component({
  selector: 'app-mis-programas',
  templateUrl: './mis-programas.component.html',
  styleUrls: ['./mis-programas.component.scss']
})
export class MisProgramasComponent {

  programas:any = []

  constructor(private programasService: MisProgramasService,
    private messageService: MessageService,
    ) { }


  ngOnInit() {

    this.getProgramas();
   
  }


  async getProgramas() {


    const valid: any = await this.programasService.getProgramas();
    console.log(valid)

    if (!valid.error) {
      this.programas = valid.data

      if (valid.status == 200) {

      } else { return this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); }
    } else {
      if (valid.status != 500) { return this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrio un error!', life: 5000 }); }
    }
  }

  

}
