import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'revisar'
})
export class RevisarPipe implements PipeTransform {

  transform(arreglo: any[], texto: string): any[] {
    
  
    if(texto ===''){
     return arreglo;
   }
   texto = texto.toLowerCase();
   return arreglo.filter(item => {
     return item.name?.toLowerCase().includes(texto)
   }); 
    
     }

}
