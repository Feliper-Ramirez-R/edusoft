import { Component } from '@angular/core';
import { NotasFinalesService } from './notas-finales.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
/* import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver'; */


const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-notas-finales',
  templateUrl: './notas-finales.component.html',
  styleUrls: ['./notas-finales.component.scss']
})
export class NotasFinalesComponent {

  notaFinal:any[] = [];
  filter: string = '';
  id_materia:any
  excel: any[] = [];



  constructor(private notasFinalesService: NotasFinalesService,
    private messageService: MessageService,
    private router:Router,
    private route: ActivatedRoute,) { }


  ngOnInit() {
    console.log(this.route.snapshot.paramMap.get('id'));
    this.id_materia = this.route.snapshot.paramMap.get('id');
    this.verNotasFinales()
  }


  async exportAsXLSX(): Promise<void> {

   /*  if(this.excel.length == 0){return}

   let data= this.excel
 
   this.exportAsExcelFile(data, 'Exportable'); */
 }

/*  public exportAsExcelFile(json: any[], excelFileName: string): void {
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
  const workbook: XLSX.WorkBook = {
    Sheets: { data: worksheet },
    SheetNames: ['data'],
  };
  const excelBuffer: any = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
  });
  this.saveAsExcelFile(excelBuffer, excelFileName);
}
private saveAsExcelFile(buffer: any, fileName: string): void {
  const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
  FileSaver.saveAs(
    data,
    fileName + '-' + new Date().toLocaleString("es-ES", { day: "2-digit", month: "long", year: "numeric" }) + EXCEL_EXTENSION
  );
} */



  async verNotasFinales() {

    const valid: any = await this.notasFinalesService.verNotasFinales(this.id_materia);
    console.log(valid)

    if (!valid.error) {
       this.notaFinal = valid.data
       this.excel = valid.dataFile
      if (valid.status == 200) {

        valid.dataFile.forEach((element:any) => {
          element.score = element.score.replace('.',',')
        });

      } else { return this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); }
    } else {
      if (valid.status != 500) { return this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrió un error!', life: 5000 }); }
    }
  }

}
