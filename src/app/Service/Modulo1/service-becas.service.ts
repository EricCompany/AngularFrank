import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
// Serivice
import {ConfigService} from '../config.service';
import {Modulo1Excel} from '../../DTO/modulo1Excel';

const HEADER = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  }),
};

@Injectable({
  providedIn: 'root'
})
export class ServiceBecasService {

  constructor(private http: HttpClient, private endpoint: ConfigService) { }

  getPDF(File: FormData): Observable<any> {
    return this.http.post(this.endpoint.getEndPoint() + 'PDF/mypdf.php', File, {responseType: 'arraybuffer'});
  }
/*Registra los excel  en la BD*/
  sendExcel(file: FormData): Observable<any> {
    return this.http.post(this.endpoint.getEndPoint() + 'BecasSubes/mod1_registrarExcel.php', file );
  }
/*Obtiene el select de los excel registrados*/
  getFiles(): Observable<Modulo1Excel[]> {
    return this.http.get<Modulo1Excel[]>(this.endpoint.getEndPoint() + 'BecasSubes/mod1_enviarSelect.php', );
  }
/*Genera la grafica de acuerdo al excel seleccionado*/
  graficarSelect(opc: number): Observable<any> {
    return this.http.post(this.endpoint.getEndPoint() + 'BecasSubes/mod1_graficarSelect.php', opc, HEADER );
  }
}
