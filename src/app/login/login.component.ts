import { Component, OnInit } from '@angular/core';

// import para form
import { FormBuilder, Validators } from '@angular/forms';
import { LoginServiceService} from '../Service/login-service.service';
import {ResponseDTO} from '../DTO/ResponseDTO';
// DTO
import {LoginDTO} from '../DTO/LoginDTO';
import { Router } from '@angular/router';
import {Message} from 'primeng/api';
import {MessageService} from 'primeng/api';

// Block
import { BlockUI, NgBlockUI } from 'ng-block-ui';

// Confirmacion
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[ MessageService, ConfirmationService]
})
export class LoginComponent implements OnInit {
  checkoutForm;
  resp: ResponseDTO;
  msgs: Message[] = [];


  @BlockUI() blockUI: NgBlockUI;

  // Variabler globales form
  constructor( private confirmationService: ConfirmationService, private messageService: MessageService, private form: FormBuilder, private http: LoginServiceService, private router: Router) {


    //  creamos el Form
    this.checkoutForm = this.form.group({
      user: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit() {
  }

  login() {
    this.blockUI.start('Comprobando Informacion...'); // Start blocking

    // [routerLink]="['/ModuloBecas/']"
    // console.log(this.checkoutForm.value);

    let formData = new FormData();
    formData.append('user', this.checkoutForm.value.user);
    formData.append('password', this.checkoutForm.value.password);

    this.http.Login(formData).subscribe(
      (resp) => {
        this.resp = resp;

         if(this.resp.status){
           sessionStorage.setItem('DataUser',  JSON.stringify(this.resp.data));
           this.router.navigate(['/ModuloBecas']);
         }else{
           this.msgs = [];
           this.msgs.push({severity: 'error', summary: this.resp.msg, detail: ''});
           // console.log();
         }
        this.blockUI.stop();
      },
      (error) => {

        console.log(error);
        this.blockUI.stop();
      }
    );
  }




  confirm1() {
    let formData = new FormData();
    if (this.checkoutForm.value.user === null || this.checkoutForm.value.user === '' || this.checkoutForm.value.user === undefined) {
      this.msgs = [];
      this.msgs = [{severity: 'error', summary: 'Correo Invalido.', detail: ''}];
      return;
    }

      formData.append('email', this.checkoutForm.value.user);

      this.confirmationService.confirm({
        message: 'Deseas Recuperar tu contraseña?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.http.recoveryPass(formData).subscribe(
            (resp) => {
              this.msgs = [];
              this.msgs = [{severity: 'success', summary: 'Confirmed', detail: 'Se ha enviado tu contraseña al correo que ingresaste'}];
            },
            (error) => {
              console.log(error);
            }
          );
        },
        reject: () => {
          this.msgs = [];
          this.msgs = [{severity: 'error', summary: 'Rejected', detail: 'Cancelaste la recuperacion de contraseña'}];
        }
      });
  }


}
