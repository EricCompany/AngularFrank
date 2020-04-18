import { Component, OnInit } from '@angular/core';
import { Modulo3Service } from '../../Service/Modulo3/modulo3.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { SelectDTO } from '../../DTO/SelectDTO';
import { SelectService } from '../../Service/Modulo2/select.service';
import { LibrosTitulacionDTO } from '../../DTO/LibrosTitulacionDTO';
import { FormBuilder, Validators } from '@angular/forms';
import { GraficaModulo2DTO } from '../../DTO/GraficaModulo2DTO';
import { TituloGrafica2 } from '../../DTO/TituloModulo2GraficaPDO';
import { MessageService } from 'primeng/api';
import { Grafica2Modulo2DTO } from '../../DTO/Grafica2Modulo2DTO';
import { Verify } from '../../DTO/VerificacionExcelDTO';
import htmlToImage from 'html-to-image';
import { logging } from 'protractor';
@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css'],
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

export class TablaComponent implements OnInit {
  cars: any[];
  @BlockUI() blockUI: NgBlockUI;
  cols: any[];
  cities: SelectDTO[];
  TituloGrafica2: TituloGrafica2[];
  TituloGrafica2Tipo: any[];
  tabla: LibrosTitulacionDTO[];
  grafica: GraficaModulo2DTO[];
  grafica2: Grafica2Modulo2DTO[];
  verificacion: Verify;
  opcionSeleccionado: any;
  opcionSeleccionadoGrafica: any;
  opcionSeleccionadoNombreGrafica: any;
  seleccionado: any;
  Grado: any;

  Data;
  DataGrafica;
  fileToUpload: File = null;
  fileToUploadName: string = null;
  mostrar = false;
  mostrarInputGrafica = false;
  mostrarBotonGrafica = false;
  displayMaximizable: boolean;
  options: any;
  optionsM: any;
  dataTitle: any[];
  Cargo: any[];
  CargoValores: any[];
  data: any[];
  imgF = new Image();
  respBlob: any;
  presidente: any;
  secretario: any;
  vocal: any;
  Titulo: any;
  DisabledPie: boolean = true;
  DisabledLine: boolean = false;
  DisabledBar: boolean = false;
  GraficaID: any;

  constructor(private MessageService: MessageService, private http: Modulo3Service, private form: FormBuilder, private httpselect: SelectService) {

    this.Data = this.form.group({
      data: ['', Validators.required]
    });

    this.DataGrafica = this.form.group({
      data: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getArchivos();


    this.TituloGrafica2Tipo = [
      { id: 0, value: 'Presidente' },
      { id: 1, value: 'Secretario' },
      { id: 2, value: 'Vocal' }
    ];

    this.cols = [
      { field: 'no_control', header: 'No. DE CONTROL' },
      { field: 'nombre', header: 'NOMBRE' },
      { field: 'carrera', header: 'CARRERA' },
      { field: 'fecha_titulacion', header: 'FECHA DE TITULACIÓN' },
      { field: 'semestre', header: 'SEMESTRE Y AÑO' },
      { field: 'hombre', header: 'HOMBRE' },
      { field: 'mujer', header: 'MUJER' },
      { field: 'opcion_titulacion', header: 'OPCION DE TITULACIÓN' },
      { field: 'noLibro', header: 'No. DE LIBRO' },
      { field: 'foja', header: 'FOJA' },
      { field: 'presidente', header: 'PRESIDENTE' },
      { field: 'secretario', header: 'SECRETARIO' },
      { field: 'vocal', header: 'VOCAL' }
    ];


    this.data = [];
    this.dataTitle = [];
    this.dataTitle.push('INGENIERIA EN SISTEMAS COMPUTACIONALES');
    this.dataTitle.push('IINGENIERIA INDUSTRIAL');
    this.dataTitle.push('INGENIERIA EN GESTION EMPRESARIAL');
    this.dataTitle.push('INGENIERIA MECATRONICA');
    this.dataTitle.push('CONTADOR PUBLICO');
    this.dataTitle.push('INGENIERIA ELECTRONICA');



    this.data.push({ value: 0, name: 'INGENIERIA EN SISTEMAS COMPUTACIONALES \n Hombres: 0 \n Mujeres: 0' });
    this.data.push({ value: 0, name: 'IINGENIERIA INDUSTRIAL \n Hombres: 0 \n Mujeres: 0' });
    this.data.push({ value: 0, name: 'INGENIERIA EN GESTION EMPRESARIAL \n Hombres: 0 \n Mujeres: 0' });
    this.data.push({ value: 0, name: 'INGENIERIA MECATRONICA \n Hombres: 0 \n Mujeres: 0' });
    this.data.push({ value: 0, name: 'ICONTADOR PUBLICO \n Hombres: 0 \n Mujeres: 0' });
    this.data.push({ value: 0, name: 'INGENIERIA ELECTRONICA \n Hombres: 0 \n Mujeres: 0' });
    this.DrawGrafica(this.dataTitle, this.data, this.Titulo, this.GraficaID);
  }


  getDateTable(event) {
    if (event.target.files[0]) {
      this.fileToUpload = event.target.files[0];
      this.fileToUploadName = event.target.files[0].name;
    } else {
      this.mostrar = false;
    }
  }

  uploadFileToActivity() {
    this.blockUI.start('Procesando Archivo...'); // Start blocking
    let formdata = new FormData();
    formdata.append('excel', this.fileToUpload, this.fileToUploadName);
    this.http.getDataTable(formdata).subscribe(
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
    this.httpselect.getSelectFiles().subscribe(
      (v) => {
        this.cities = v;
      },
      (err) => { console.log(err); }
    );
  }

  getNombreGrafica() {
    let Datos = new FormData();
    Datos.append('idGrado', this.Grado['id']);
    Datos.append('idTabla', this.opcionSeleccionado['id']);
    this.httpselect.getNombre(Datos).subscribe(
      (data) => {
        this.TituloGrafica2 = data;
        this.mostrarBotonGrafica = true;
        this.opcionSeleccionadoNombreGrafica = {};
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getArchivo() {
    this.blockUI.start('Cargando Tabla...'); // Start blocking
    this.mostrarBotonGrafica = false;
    this.Grado = {};
    this.opcionSeleccionadoNombreGrafica = {};
    this.httpselect.getDataFile(this.opcionSeleccionado).subscribe(
      (data) => {
        this.tabla = data;
        this.mostrarInputGrafica = true;
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
      this.httpselect.searchDataTable(formData).subscribe(
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

  Grafica1() {
    let TituloGrafica = '';
    this.GraficaID = "1";
    this.httpselect.graficaExcel(this.opcionSeleccionadoGrafica).subscribe(
      (resp) => {
        this.displayMaximizable = true;
        this.grafica = resp;
        this.data = [];
        this.dataTitle = [];
        this.Titulo = TituloGrafica;
        this.grafica.forEach(v => {
          this.dataTitle.push(v.CARRERA);
          this.data.push({ value: v.TOTAL, name: v.CARRERA + ' \n HOMBRES: ' + v.HOMBRES + '\n MUJERES:' + v.MUJERES + '\n TOTAL:' + v.TOTAL });
          this.opcionSeleccionadoGrafica = {};
        });
        this.DrawGrafica(this.dataTitle, this.data, this.Titulo, this.GraficaID);
        this.DisabledPie = true;
        this.DisabledLine = false;
        this.DisabledBar = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  Grafica2() {
    let TituloGrafica = this.opcionSeleccionadoNombreGrafica['nombre'];
    let DatosGrafica = new FormData();
    this.GraficaID = "2";
    DatosGrafica.append('nombre', this.opcionSeleccionadoNombreGrafica['nombre']);
    DatosGrafica.append('id', this.opcionSeleccionado['id']);
    this.httpselect.graficaExel2(DatosGrafica).subscribe(
      (data) => {
        this.displayMaximizable = true;
        this.grafica2 = data;

        this.presidente = [this.grafica2[0]['hombre'], this.grafica2[0]['mujer'], this.grafica2[0]['total']];
        this.secretario = [this.grafica2[1]['hombre'], this.grafica2[1]['mujer'], this.grafica2[1]['total']];
        this.vocal = [this.grafica2[2]['hombre'], this.grafica2[2]['mujer'], this.grafica2[2]['total']];
        this.Titulo = TituloGrafica;

        this.Cargo = [];
        this.CargoValores = [];
        this.grafica2.forEach(v => {
          let Var = TituloGrafica.split(' ');
          let Titulo1: string;
          let Titulo2: string;
          if (Var.length == 3) {
            Titulo1 = v.cargo + ' ' + Var[0] + ' ' + Var[1] + ' ' + Var[2];
            Titulo2 = '';
          } else if (Var.length == 4) {
            Titulo1 = v.cargo + ' ' + Var[0] + ' ' + Var[1];
            Titulo2 = Var[2] + ' ' + Var[3];
          } else if (Var.length == 5) {
            Titulo1 = v.cargo + ' ' + Var[0] + ' ' + Var[1] + ' ' + Var[2];
            Titulo2 = Var[3] + ' ' + Var[4];
          } else {
            Titulo1 = v.cargo + ' ' + Var[0] + ' ' + Var[1] + ' ' + Var[2];
            Titulo2 = Var[3] + ' ' + Var[4] + ' ' + Var[5];
          }

          this.Cargo.push(v.cargo + ' ' + TituloGrafica);
          this.CargoValores.push({ value: v.total, name: Titulo1 + '\n' + Titulo2 + ' \n HOMBRES: ' + v.hombre + '\n MUJERES:' + v.mujer + '\n TOTAL:' + v.total });
        });
        this.DrawGrafica(this.Cargo, this.CargoValores, this.Titulo, this.GraficaID);
        this.opcionSeleccionadoNombreGrafica = {};
        this.DisabledPie = true;
        this.DisabledLine = false;
        this.DisabledBar = false;
      }, error => {
        console.log(error);
      }
    );

  }

  Pie() {
    if (this.GraficaID === "1") {
      this.DrawGrafica(this.dataTitle, this.data, this.Titulo, this.GraficaID);
    } else {
      this.DrawGrafica(this.Cargo, this.CargoValores, this.Titulo, this.GraficaID);
    }
    this.DisabledPie = true;
    this.DisabledLine = false;
    this.DisabledBar = false;
  }
  Line() {
    this.DrawGrafica2(this.presidente, this.secretario, this.vocal, this.Titulo, this.GraficaID, this.grafica);
    this.DisabledPie = false;
    this.DisabledLine = true;
    this.DisabledBar = false;

  }
  Bar() {
    this.DrawGrafica3(this.presidente, this.secretario, this.vocal, this.Titulo, this.GraficaID, this.grafica);
    this.DisabledPie = false;
    this.DisabledLine = false;
    this.DisabledBar = true;
  }

  Grafica3() {
    let TituloGrafica = this.opcionSeleccionadoNombreGrafica['nombre'];
    let DatosGrafica = new FormData();
    DatosGrafica.append('nombre', this.opcionSeleccionadoNombreGrafica['nombre']);
    DatosGrafica.append('id', this.opcionSeleccionado['id']);
    this.httpselect.graficaExel2(DatosGrafica).subscribe(
      (data) => {
        this.displayMaximizable = true;
        this.grafica2 = data;

        let presidente = [this.grafica2[0]['hombre'], this.grafica2[0]['mujer'], this.grafica2[0]['total']];
        let secretario = [this.grafica2[1]['hombre'], this.grafica2[1]['mujer'], this.grafica2[1]['total']];
        let vocal = [this.grafica2[2]['hombre'], this.grafica2[2]['mujer'], this.grafica2[2]['total']];
        //this.DrawGrafica2(presidente, secretario, vocal, TituloGrafica);

        this.opcionSeleccionadoNombreGrafica = {};

      }, error => {
        console.log(error);
      }
    );

  }

  DrawGrafica3(presidente: any, secretario: any, vocal: any, titulo: any, id: any, grafica: any) {
    if (id === '1') {
      this.options = {
        backgroundColor: 'rgba(240, 240, 240, 0.55)',
        title: {
          text: 'LIBROS TITULACION' + '\n' + titulo,
          left: 'center'
        },
        legend: {
          data: ['product', 'LICADMON', 'ISC', 'IELECT', 'MECA', 'IND', 'IGE', 'CP'],
          top: '10%'
        },
        tooltip: {},
        grid: {
          left: '15%',
          right: '15%',
          bottom: '3%',
          containLabel: true
        },
        dataset: {

          source: [
            { product: 'Hombres', 'LICADMON': grafica[0]['HOMBRES'], 'ISC': grafica[1]['HOMBRES'], 'IELECT': grafica[2]['HOMBRES'], 'MECA': grafica[3]['HOMBRES'], 'IND': grafica[4]['HOMBRES'], 'IGE': grafica[5]['HOMBRES'], 'CP': grafica[6]['HOMBRES'] },
            { product: 'Mujeres', 'LICADMON': grafica[0]['MUJERES'], 'ISC': grafica[1]['MUJERES'], 'IELECT': grafica[2]['MUJERES'], 'MECA': grafica[3]['MUJERES'], 'IND': grafica[4]['MUJERES'], 'IGE': grafica[5]['MUJERES'], 'CP': grafica[6]['MUJERES'] },
            { product: 'Total', 'LICADMON': grafica[0]['TOTAL'], 'ISC': grafica[1]['TOTAL'], 'IELECT': grafica[2]['TOTAL'], 'MECA': grafica[3]['TOTAL'], 'IND': grafica[4]['TOTAL'], 'IGE': grafica[5]['TOTAL'], 'CP': grafica[6]['TOTAL'] }
          ]
        },
        toolbox: {
          feature: {
            saveAsImage: { title: 'Descargar Imagen' }
          }
        },
        xAxis: { type: 'category' },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          { type: 'bar' },
          { type: 'bar' },
          { type: 'bar' },
          { type: 'bar' },
          { type: 'bar' },
          { type: 'bar' },
          { type: 'bar' }
        ]
      };

    } else {
      this.options = {
        backgroundColor: 'rgba(240, 240, 240, 0.55)',
        title: {
          text: 'LIBROS TITULACION' + '\n' + titulo,
          left: 'center'
        },
        legend: {
          data: ['product', 'Presidente', 'Secretario', 'Vocal'],
          top: '10%'
        },
        tooltip: {},
        grid: {
          left: '15%',
          right: '15%',
          bottom: '3%',
          containLabel: true
        },
        dataset: {

          source: [
            { product: 'Hombres', 'Presidente': presidente[0], 'Secretario': secretario[0], 'Vocal': vocal[0] },
            { product: 'Mujeres', 'Presidente': presidente[1], 'Secretario': secretario[1], 'Vocal': vocal[1] },
            { product: 'Total', 'Presidente': presidente[2], 'Secretario': secretario[2], 'Vocal': vocal[2] }
          ]
        },
        toolbox: {
          feature: {
            saveAsImage: { title: 'Descargar Imagen' }
          }
        },
        xAxis: { type: 'category' },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          { type: 'bar' },
          { type: 'bar' },
          { type: 'bar' }
        ]
      };
    }

  }

  DrawGrafica2(presidente: any, secretario: any, vocal: any, titulo: any, id: any, grafica: any) {
    if (id === '1') {
      this.options = {
        backgroundColor: 'rgba(240, 240, 240, 0.55)',
        title: {
          text: 'LIBROS TITULACION' + '\n' + titulo,
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['LICADMON', 'ISC', 'IELECT', 'MECA', 'IND', 'IGE', 'CP'],
          top: '10%'
        },
        grid: {
          left: '15%',
          right: '15%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: { title: 'Descargar Imagen' }
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Hombres', 'Mujeres', 'Total']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'LICADMON',
            type: 'line',
            data: [grafica[0]['HOMBRES'], grafica[0]['MUJERES'], grafica[0]['TOTAL']]
          },
          {
            name: 'ISC',
            type: 'line',
            data: [grafica[1]['HOMBRES'], grafica[1]['MUJERES'], grafica[1]['TOTAL']]
          },
          {
            name: 'IELECT',
            type: 'line',
            data: [grafica[2]['HOMBRES'], grafica[2]['MUJERES'], grafica[2]['TOTAL']]
          },
          {
            name: 'MECA',
            type: 'line',
            data: [grafica[3]['HOMBRES'], grafica[3]['MUJERES'], grafica[3]['TOTAL']]
          },
          {
            name: 'IND',
            type: 'line',
            data: [grafica[4]['HOMBRES'], grafica[4]['MUJERES'], grafica[4]['TOTAL']]
          },
          {
            name: 'IGE',
            type: 'line',
            data: [grafica[5]['HOMBRES'], grafica[5]['MUJERES'], grafica[5]['TOTAL']]
          },
          {
            name: 'CP',
            type: 'line',
            data: [grafica[6]['HOMBRES'], grafica[6]['MUJERES'], grafica[6]['TOTAL']]
          }
        ]
      };
    } else {
      this.options = {
        backgroundColor: 'rgba(240, 240, 240, 0.55)',
        title: {
          text: 'LIBROS TITULACION' + '\n' + titulo,
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Presidente', 'Secretario', 'Vocal'],
          top: '10%'
        },
        grid: {
          left: '15%',
          right: '15%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: { title: 'Descargar Imagen' }
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['hombre', 'mujer', 'total']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Presidente',
            type: 'line',
            data: [presidente[0], presidente[1], presidente[2]]
          },
          {
            name: 'Secretario',
            type: 'line',
            data: [secretario[0], secretario[1], secretario[2]]
          },
          {
            name: 'Vocal',
            type: 'line',
            data: [vocal[0], vocal[1], vocal[2]]
          }
        ]
      };
    }
  }

  DrawGrafica(dataTitle: any, Data: any, titulo: any, id: any) {
    this.options = {
      backgroundColor: 'rgba(240, 240, 240, 0.55)',
      toolbox: {
        feature: {
          saveAsImage: { title: 'Descargar Imagen' }
        }
      },
      plugins: {
        datalabels: {
          color: 'white',
          backgroundColor: function (context) {
            return context.dataset.backgroundColor;
          },
          borderRadius: 5,
          display: function (context) {
            return context.dataset.data[context.dataIndex] > 0;
          },
          font: {
            weight: 'bold',
            size: 14,
            color: "black"
          },
          formatter: function (value, context, ap = '<?php echo json_encode($CalMat) ?>', rp = '<?php echo json_encode($CalMatR) ?>') {
            //para aprobados

            return '8%';
          }
        }
      },


      title: {
        text: 'LIBROS TITULACION' + '\n' + titulo,
        //  subtext: '纯属虚构',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: [dataTitle]
      },
      series: [
        {
          name: 'Libro Titulacion',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: Data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    this.optionsM = this.options;
  }

  getPDFGrafica() {
    this.blockUI.start('Generando PDF...'); // Start blocking
    let formData = new FormData();
    let IMGRAFICA = document.getElementById('ImageGrafica');
    htmlToImage.toPng(IMGRAFICA).then(
      (imgbase64) => {

        this.imgF.src = imgbase64;

        // document.body.appendChild(img);
        //  this.img.src = dataUrl;

        // Save in FormData
        // formData.append('imagen', event.target.files[0], 'grafica.png');
        formData.append('imagen', this.imgF.src);

        // Call Service
        this.GeneratePDF(formData);

      }
    ).catch(function (error) {
      this.blockUI.stop();
      console.error('oops, something went wrong!', error);
    });
  }
  GeneratePDF(File: FormData) {
    this.httpselect.getPDF(File).subscribe(
      (resp) => {
        this.respBlob = resp;

        let blob = new Blob([this.respBlob], { type: 'application/pdf' });
        let a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        let ahora: Date = new Date();
        let nombreFile = 'Libros_Titulacion_' + ahora.getFullYear() + '-' + ahora.getMonth() + '-' + ahora.getDate() + '_' + ahora.getHours() + "-" + ahora.getMinutes() + "-" + ahora.getSeconds() + '.pdf';
        a.download = nombreFile;
        document.body.appendChild(a);
        a.click();


        console.log('Se realizó el post correctamente');
        this.blockUI.stop();
      },
      (error) => { console.log(error); this.blockUI.stop(); }
    );

  }
}
