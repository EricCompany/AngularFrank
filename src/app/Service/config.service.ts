import { Injectable } from '@angular/core';

// const  endpoint = 'http://localhost/ServiciosEscolares/';
 const endpoint = 'http://40.122.104.110/ServiciosEscolares/';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  getEndPoint(){
    return endpoint;
  }
}
