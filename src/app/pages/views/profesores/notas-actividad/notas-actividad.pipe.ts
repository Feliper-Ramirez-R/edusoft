import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'notasActividad'
})
export class NotasActividadPipe implements PipeTransform {

  transform(arreglo: any[], texto: string): any[] {
    
  
    if(texto ===''){
     return arreglo;
   }
   texto = texto.toLowerCase();
   return arreglo.filter(item => {
     return item.user?.toLowerCase().includes(texto)
   }); 
    
     }

}
