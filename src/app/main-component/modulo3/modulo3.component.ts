import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MessageService, Message } from 'primeng/api';
import { Modulo3Service } from '../../Service/Modulo3/modulo3.service';
import { Verify } from '../../DTO/VerificacionExcelDTO';
import { SelectDTO } from '../../DTO/SelectDTO';
import { AfiliacionIMSSDTO } from '../../DTO/AfiliacionIMSSDTO';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
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
  fileToUpload2: File = null;
  fileToUploadName2: string = null;
  seleccionado: any;
  seleccionado2: any;
  mostrar: false;
  mostrar2: false;
  showButton: boolean = false;
  verificacion: Verify;
  cities: SelectDTO[];
  opcionSeleccionado: any;
  opcionSeleccionado2: any;
  tabla: AfiliacionIMSSDTO[];
  Data;


  constructor(private form: FormBuilder, private MessageService: MessageService, private http: Modulo3Service) {

    this.Data = this.form.group({
      data: ['', Validators.required]
    });
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
        if (data === 'El archivo ' + this.fileToUploadName + ' se cargo con EXITO.') {
          this.MessageService.add({ key: 'excel', severity: 'success', summary: 'Estatus EXCEL', detail: "'" + this.verificacion + "'" });
        } else {
          this.MessageService.add({ key: 'excel', severity: 'error', summary: 'Estatus EXCEL', detail: "'" + this.verificacion + "'" });
        }
        this.getArchivos();
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
    } else {
      this.mostrar = false;
    }
  }
  subirExcel2() {

    console.log(this.fileToUpload2);
    console.log(this.fileToUploadName2);

    this.blockUI.start('Procesando Archivo...');
    let formdata = new FormData();
    formdata.append('excel', this.fileToUpload2, this.fileToUploadName2);
    formdata.append('id', this.opcionSeleccionado2['id']);
    this.http.SubirExcel2(formdata).subscribe(
      (data) => {
        this.verificacion = data;
        if (data === 'El archivo ' + this.fileToUploadName2 + ' se cargo con EXITO.') {
          this.MessageService.add({ key: 'excel', severity: 'success', summary: 'Estatus EXCEL', detail: "'" + this.verificacion + "'" });
        } else {
          this.MessageService.add({ key: 'excel', severity: 'error', summary: 'Estatus EXCEL', detail: "'" + this.verificacion + "'" });
        }
        this.getArchivos();
        this.blockUI.stop();
        this.mostrar2 = false;
        this.showButton = false;
        this.opcionSeleccionado2 = {};
        this.seleccionado2 = '';
      },
      (error) => {
        this.MessageService.add({ key: 'excel', severity: 'info', summary: 'Estatus EXCEL', detail: 'Es posible que el nombre con el que intenta registrar el archivo este en uso, FAVOR DE VERIFICAR!' });
        console.log(error);
        this.blockUI.stop();
        this.mostrar2 = false;
        this.showButton = false;
        this.opcionSeleccionado2 = {};
        this.seleccionado2 = '';
      }
    );


  }
}
