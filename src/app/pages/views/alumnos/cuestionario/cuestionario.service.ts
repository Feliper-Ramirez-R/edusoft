import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { rutas } from 'src/env/rutas'

@Injectable({
  providedIn: 'root'
})
export class CuestionarioService {

  prefix:string = 'alumn'

  constructor(private user: AuthService,
              private http: HttpClient,
              private router: Router,
              private messageService: MessageService) { }


  async getCuestionario(id:any) {

    return new Promise(resolve => {
      const headers = new HttpHeaders({
        Authorization: 'Bearer ' + this.user.token,
      });

      this.http.get(rutas.ruta + this.prefix+'/getQuestions/'+id,{ headers }).subscribe({
        next: (answer: any) => {
          resolve(answer);
        },
        error: error => {
          console.log(<any>error);
          resolve(error);
        }
      });
    });
  }

  async enviarCuestionario() {

    return new Promise(resolve => {
      const headers = new HttpHeaders({
        Authorization: 'Bearer' + this.user.token,
      });

      this.http.get(rutas.ruta + this.prefix+'/', { headers }).subscribe({
        next: (answer: any) => {
          resolve(answer);
        },
        error: error => {
          if (error.status == 401) {
            this.messageService.add({ severity: 'info', summary: 'Ups!', detail: 'Su sesión expiró, inicie de nuevo', life: 5000 });
            this.router.navigate(['/auth/login']);
             console.log(error);
            return
          }
          resolve(error);
        }
      });
    });
  }

}
