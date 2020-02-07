import { Component, OnInit } from '@angular/core';
// import para form
import { FormBuilder, Validators } from '@angular/forms';
import {Message, MessageService} from 'primeng/api';
// Service
import {LoginServiceService} from '../../Service/login-service.service';

// Resposne
import {ResponseDTO2} from '../../DTO/ResponseDTO2';


@Component({
  selector: 'app-form-registro',
  templateUrl: './form-registro.component.html',
  styleUrls: ['./form-registro.component.css'],
  providers:[MessageService]
})
export class FormRegistroComponent implements OnInit {
  formRegistro;
  viewPass: boolean = true;
  msgs: Message[] = [];
  resp2: ResponseDTO2;
  constructor(private http: LoginServiceService, private messageService: MessageService, private form: FormBuilder) {
    //  creamos el Form
    this.formRegistro = this.form.group({
      correo: ['', Validators.required],
      pass: ['', [Validators.required, Validators.minLength(8)]],
      pass2: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {
  }

  //clase de boton para registrar
  registro() {
    let formData = new FormData();
    if(this.formRegistro.value.pass === this.formRegistro.value.pass2  ){
         formData.append('email', this.formRegistro.value.correo);
         formData.append('pass', this.formRegistro.value.pass);

         this.http.Registro(formData).subscribe(
           (resp) => {
             this.resp2 = resp;
             if(this.resp2.status){
               this.msgs = [];
               this.msgs.push({severity: 'success', summary: 'Cuenta Registrada', detail: ''});
             }else {
               this.msgs = [];
               this.msgs.push({severity: 'error', summary: this.resp2.msg, detail: ''});
             }
           },
           (error) => { console.log(error); }
         );


    }else{
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: 'Las contraseñas no coinciden', detail: ''});
    }
    }

}
