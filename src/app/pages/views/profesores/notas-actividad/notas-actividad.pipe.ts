import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notasActividad'
})
export class NotasActividadPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
