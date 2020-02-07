import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
// Serivice
import {ConfigService} from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceBecasService {

  constructor(private http: HttpClient, private endpoint: ConfigService) { }

  getPDF(File: FormData): Observable<any> {
    return this.http.post(this.endpoint.getEndPoint() + 'PDF/mypdf.php', File, {responseType: 'arraybuffer'});
   // return this.http.post('http://52.170.42.232/fito/mypdf.php', File, {responseType: 'arraybuffer'});
  }

  sendExcel(file: FormData): Observable<any> {
    return this.http.post(this.endpoint.getEndPoint() + 'AnalisisExcel/revexcele.php', file, );
  };
}
