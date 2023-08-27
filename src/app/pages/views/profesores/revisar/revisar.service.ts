import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { rutas } from 'src/env/rutas'

@Injectable({
  providedIn: 'root'
})
export class RevisarService {

  prefix:string = 'teacher'

  constructor(private user: AuthService, private http: HttpClient) { }


  async getRevision(id:any) {

    return new Promise(resolve => {
      const headers = new HttpHeaders({
        Authorization: 'Bearer ' + this.user.token,
      });

      this.http.get(rutas.ruta + this.prefix+'/myRevisions/'+id,{ headers }).subscribe({
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

}
