import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


// Confirmacion
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService, MessageService} from 'primeng/api';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css'],
  providers:[ MessageService, ConfirmationService]
})
export class MenuPrincipalComponent implements OnInit {

  constructor(private confirmationService: ConfirmationService, private router: Router) {
    let dataUser =  JSON.parse(sessionStorage.getItem('DataUser'));
    if(dataUser === null){
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
  }

  salir(){
    this.confirmationService.confirm({
      message: '¿Deseas cerrar sesión?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        sessionStorage.removeItem('DataUser');
        this.router.navigate(['/']);
      },
      reject: () => {
        }
    });
  }

}
