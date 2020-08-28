import { Injectable } from '@angular/core';

<<<<<<< HEAD
// const  endpoint = 'http://localhost/ServiciosEscolares/';
=======
 //const  endpoint = 'http://localhost/ServiciosEscolares/';
>>>>>>> 5f06a4bd99973db39f69011a0a466855e85f1022
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
