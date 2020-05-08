import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MessageService, Message } from 'primeng/api';
import { Modulo3Service } from '../../Service/Modulo3/modulo3.service';
import { Verify } from '../../DTO/VerificacionExcelDTO';
import { SelectDTO } from '../../DTO/SelectDTO';
import { AfiliacionIMSSDTO } from '../../DTO/AfiliacionIMSSDTO';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MainComponentComponent } from '../main-component.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-modulo3',
  templateUrl: './modulo3.component.html',
  styleUrls: ['./modulo3.component.css'],
  providers: [MessageService],
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
  fileToUpload2: File = null;
  fileToUploadName2: string = null;
  seleccionado: any;
  seleccionado2: any;
  mostrar: boolean = false;
  mostrar2: boolean = false;
  showButton: boolean = false;
  verificacion: Verify;
  cities: SelectDTO[];
  opcionSeleccionado: any;
  opcionSeleccionado2: any;
  tabla: AfiliacionIMSSDTO[];
  Data;
  displayBasic: boolean;

  showModalDialog() {
    this.displayBasic = true;
  }
  constructor(private router: Router, private form: FormBuilder, private MessageService: MessageService,
    public app: MainComponentComponent,
    private http: Modulo3Service) {
    this.app.activeIndex = 2;
    this.Data = this.form.group({
      data: ['', Validators.required]
    });
    let dataUser = JSON.parse(sessionStorage.getItem('DataUser'));
    if (dataUser === null) {
      this.router.navigate(['/']);
    }
  }
  ngOnInit() {
    this.getArchivos();
    this.cols = [
      { field: 'no_control', header: 'No. DE CONTROL' },
      { field: 'apellido_pat', header: 'Apellido Paterno' },
      { field: 'apellido_mat', header: 'Apellido Matermo' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'nss', header: 'Numero de Seguro Social' }
    ];
  }
  getTable(event) {
    this.mostrar = true;
    if (event.target.files[0]) {
      this.fileToUpload = event.target.files[0];
      this.fileToUploadName = event.target.files[0].name;
    } else {
      this.mostrar = false;
    }
  }



  subirExcel() {
    this.blockUI.start('Procesando Archivo...');
    let formdata = new FormData();
    formdata.append('excel', this.fileToUpload, this.fileToUploadName);
    this.http.SubirExcel(formdata).subscribe(
      (data) => {
        this.verificacion = data;
        this.MessageService.add({ key: 'excel', severity: 'success', summary: 'Estatus EXCEL', detail: "'" + this.verificacion + "'", life: 10000 });
        this.getArchivos();
        this.blockUI.stop();
        this.mostrar = false;
        this.seleccionado = '';
      },
      (error) => {
        this.MessageService.add({ key: 'excel', severity: 'error', summary: 'Estatus EXCEL', detail: "'" + error['error'] + "'", life: 20000 });
        console.log(error);
        this.blockUI.stop();
        this.mostrar = false;
        this.seleccionado = '';
      }
    );
  }

  getArchivos() {
    this.http.getSelectFiles().subscribe(
      (v) => {
        this.cities = v;
      },
      (err) => { console.log(err); }
    );
  }

  getTabla() {
    this.blockUI.start('Cargando Tabla...');

    this.http.getDataFile(this.opcionSeleccionado).subscribe(
      (data) => {
        this.tabla = data;
        this.blockUI.stop();
      },
      (error) => {
        this.blockUI.stop();
        console.log(error);

      }
    );
  }

  Consult() {
    if (this.opcionSeleccionado) {
      this.blockUI.start('Procesando Busqueda...'); // Start blocking
      let formData = new FormData();
      formData.append('dato', this.Data.value.data);
      formData.append('id', this.opcionSeleccionado['id']);
      this.http.searchDataTable(formData).subscribe(
        (data) => {
          this.tabla = data;
          this.blockUI.stop();
        },
        (error) => {
          console.log(error);
          this.blockUI.stop();
        }
      );
    } else {
      this.MessageService.add({ key: 'buscador', severity: 'error', summary: 'Archivo no seleccionado', detail: 'Seleccione un archivo' });
    }
  }
  fileSelect() {
    this.showButton = true;
  }

  getFile(event) {
    if (event.target.files[0]) {
      this.fileToUpload2 = event.target.files[0];
      this.fileToUploadName2 = event.target.files[0].name;
      this.mostrar2 = true;
    } else {
      this.mostrar2 = false;
    }
  }
  subirExcel2() {
    this.blockUI.start('Procesando Archivo...');
    let formdata = new FormData();
    formdata.append('excel', this.fileToUpload2, this.fileToUploadName2);
    formdata.append('id', this.opcionSeleccionado2['id']);
    this.http.SubirExcel2(formdata).subscribe(
      (data) => {
        this.verificacion = data;
        let archivo = this.opcionSeleccionado2;
        this.getTabla2(archivo);
        this.MessageService.add({ key: 'excel', severity: 'success', summary: 'Estatus EXCEL', detail: "'" + this.verificacion + "'", life: 10000 });

        this.getArchivos();
        this.blockUI.stop();
        this.mostrar2 = false;
        this.showButton = false;
        this.opcionSeleccionado = this.opcionSeleccionado2;
        this.opcionSeleccionado2 = {};
        this.seleccionado2 = '';
      },
      (error) => {
        this.MessageService.add({ key: 'excel', severity: 'error', summary: 'Estatus EXCEL', detail: "'" + error['error'] + "'", life: 20000 });
        console.log(error);
        this.blockUI.stop();
        this.mostrar2 = false;
        this.showButton = false;
        this.opcionSeleccionado2 = {};
        this.seleccionado2 = '';
      }
    );


  }

  getTabla2(archivo) {
    this.displayBasic = false;
    this.blockUI.start('Actualizando Tabla...');

    this.http.getDataFile(archivo).subscribe(
      (data) => {
        this.tabla = data;
        this.blockUI.stop();
      },
      (error) => {
        this.blockUI.stop();
        console.log(error);
      }
    );
  }
}
