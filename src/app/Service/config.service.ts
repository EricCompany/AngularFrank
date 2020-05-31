import { Injectable } from '@angular/core';

 //const  endpoint = 'http://localhost/ServiciosEscolares/';
 const endpoint = 'http://40.124.53.212/ServiciosEscolares/';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  getEndPoint(){
    return endpoint;
  }
}
