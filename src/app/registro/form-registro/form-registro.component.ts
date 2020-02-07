import { Component, OnInit } from '@angular/core';
// import para form
import { FormBuilder, Validators } from '@angular/forms';
import {Message, MessageService} from 'primeng/api';


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
  constructor( private messageService: MessageService, private form: FormBuilder) {
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
         formData.append('user', this.formRegistro.value.user);

    }else{
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: 'Las contraseñas no coinciden', detail: ''});
    }
    }

}
