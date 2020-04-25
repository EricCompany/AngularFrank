import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MessageService, Message } from 'primeng/api';
import { Modulo3Service } from '../../Service/Modulo3/modulo3.service';
import { Verify } from '../../DTO/VerificacionExcelDTO';
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
  cols: any;
  fileToUpload: File = null;
  fileToUploadName: string = null;
  seleccionado: any;
  mostrar: false;
  verificacion: Verify;

  constructor(private MessageService: MessageService, private http: Modulo3Service) { }

  ngOnInit() {
    this.cols = [
      { field: 'no_control', header: 'No. DE CONTROL' },
      { field: 'apellidoPaterno', header: 'Apellido Paterno' },
      { field: 'apellidoMaterno', header: 'Apellido Matermo' },
      { field: 'nombre', header: 'Numero de Seguro Social' }
    ];
  }
  getTable(event) {
    if (event.target.files[0]) {
      this.fileToUpload = event.target.files[0];
      this.fileToUploadName = event.target.files[0].name;
    } else {
      this.mostrar = false;
    }
  }

  subirExcel() {
    let formdata = new FormData();
    formdata.append('excel', this.fileToUpload, this.fileToUploadName);
    this.http.SubirExcel(formdata).subscribe(
      (data) => {
        this.verificacion = data;
        if (data === 'El archivo ' + this.fileToUploadName + ' se cargo con EXITO.') {
          this.MessageService.add({ key: 'excel', severity: 'success', summary: 'Estatus EXCEL', detail: "'" + this.verificacion + "'" });
        } else {
          this.MessageService.add({ key: 'excel', severity: 'error', summary: 'Estatus EXCEL', detail: "'" + this.verificacion + "'" });
        }

        this.blockUI.stop();
        this.mostrar = false;
        this.seleccionado = '';
      },
      (error) => {
        this.MessageService.add({ key: 'excel', severity: 'info', summary: 'Estatus EXCEL', detail: 'Es posible que el nombre con el que intenta registrar el archivo este en uso, FAVOR DE VERIFICAR!' });
        console.log(error);
        this.blockUI.stop();
        this.mostrar = false;
        this.seleccionado = '';
      }
    );
  }

}
