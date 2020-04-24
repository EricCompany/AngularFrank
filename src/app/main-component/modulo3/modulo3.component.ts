import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-modulo3',
  templateUrl: './modulo3.component.html',
  providers: [MessageService],
  styleUrls: ['./modulo3.component.css'],
  styles: [`
  :host ::ng-deep .ui-button {
      margin: .5em .5em .5em 0;
      width: 140px;
  }
  @media screen and (max-width: 40em) {
      :host ::ng-deep .ui-dialog {
          width: 75vw !important;
      }
  }
`]
})
export class Modulo3Component implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  constructor() { }

  ngOnInit() {
  }

}
