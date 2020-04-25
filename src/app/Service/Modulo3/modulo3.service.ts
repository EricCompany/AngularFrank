import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
// Serivice
import {ConfigService} from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class Modulo3Service {

  constructor(private endpoint: ConfigService, private http: HttpClient ) {}
  getDataTable(File: FormData): Observable<any> {
  return this.http.post(this.endpoint.getEndPoint() + 'Modulo2/Modulo2-Subir-Excel.php', File, );
  }
  SubirExcel(File: FormData): Observable<any> {
    return this.http.post(this.endpoint.getEndPoint() + 'Modulo3/Modulo3-Subir-Excel.php', File, );
    }
}
