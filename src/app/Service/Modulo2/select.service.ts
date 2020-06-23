import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SelectDTO } from 'src/app/DTO/SelectDTO';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../config.service';



const HEADER = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
};
@Injectable({
  providedIn: 'root'
})
export class SelectService {
  constructor(private endpoint: ConfigService, private http: HttpClient) { }

  getSelectFiles(): Observable<any> {
    return this.http.get(this.endpoint.getEndPoint() + 'Modulo2/Modulo2-Archivos.php', HEADER);
  }

  getDataFile(id: number): Observable<any> {
    return this.http.post(this.endpoint.getEndPoint() + 'Modulo2/Modulo2-IdArchivo.php', id, HEADER);
  }

  searchDataTable(data: FormData): Observable<any> {
    return this.http.post(this.endpoint.getEndPoint() + 'Modulo2/Modulo2-Consult.php', data);
  }
  graficaExcel(id: number): Observable<any> {
    return this.http.post(this.endpoint.getEndPoint() + 'Modulo2/Modulo2-Graph.php', id, HEADER);
  }
  graficaExel2(Datos: FormData ): Observable<any> {
    return this.http.post(this.endpoint.getEndPoint() + 'Modulo2/Modulo2-Graph2.php', Datos);
  }
  getNombre(Nombres: FormData): Observable<any>{
    return this.http.post(this.endpoint.getEndPoint() + 'Modulo2/Modulo2-NombresGrafica2.php', Nombres);
  }
  getPDF(File: FormData): Observable<any> {
    return this.http.post(this.endpoint.getEndPoint() + 'Modulo2/Modulo2-PDF.php', File, {responseType: 'arraybuffer'});
   // return this.http.post('http://52.170.42.232/fito/mypdf.php', File, {responseType: 'arraybuffer'});
  }
  getPDF2(File: FormData): Observable<any> {
    return this.http.post(this.endpoint.getEndPoint() + 'Modulo2/Modulo2-PDF2.php', File, {responseType: 'arraybuffer'});
   // return this.http.post('http://52.170.42.232/fito/mypdf.php', File, {responseType: 'arraybuffer'});
  }

}
