import { Component, OnInit } from '@angular/core';
import {StepsModule} from 'primeng/steps';
import {MenuItem} from 'primeng/api';
import { Router } from '@angular/router';
import {MainComponentComponent} from '../../main-component/main-component.component';


@Component({
  selector: 'app-menu-main',
  templateUrl: './menu-main.component.html',
  styleUrls: ['./menu-main.component.css']
})
export class MenuMainComponent implements OnInit {

  items: MenuItem[];

  activeIndex: number = 1;
  constructor(private router: Router, public app: MainComponentComponent) { }

  ngOnInit() {
   // this.app.activeIndex = this.activeIndex;

    this.items = [{
      label: 'Menu Principal',
      command: (event: any) => {
        this.app.activeIndex = 0;
        this.router.navigate(['/ModuloBecas']);
        //this.messageService.add({severity:'info', summary:'First Step', detail: event.item.label});
      }
    },
      {
        label: 'Becas Subes',
        command: (event: any) => {
          this.app.activeIndex = 1;
          this.messageService.add({severity:'info', summary:'Seat Selection', detail: event.item.label});
        }
      },
      {
        label: 'Libros de Titulacion',
        command: (event: any) => {
          this.app.activeIndex = 2;
          this.messageService.add({severity:'info', summary:'Pay with CC', detail: event.item.label});
        }
      },
      {
        label: 'Afiliacion Seguro Social IMSS',
        command: (event: any) => {
          this.app.activeIndex = 3;
          this.messageService.add({severity:'info', summary:'Last Step', detail: event.item.label});
        }
      }
    ];
  }

}
