import { Injectable } from '@angular/core';

const  endpoint = 'http://localhost/ServiciosEscolares/';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  getEndPoint(){
    return endpoint;
  }
}
