import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
// Serivice
import {ConfigService} from '../config.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceBecasService {

  constructor(private http: HttpClient, private endpoint: ConfigService) { }

  getPDF(File: FormData): Observable<any> {
    return this.http.post(this.endpoint.getEndPoint() + 'PDF/mypdf.php', '');
  }
}
