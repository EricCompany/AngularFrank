import { Component, OnInit } from '@angular/core';
// get Image of Div
import htmlToImage from 'html-to-image';
import {CardModule} from 'primeng/card';
import { Router } from '@angular/router';

// Service
import {ServiceBecasService} from '../../Service/Modulo1/service-becas.service';

// Echarts
import * as echarts from 'echarts';
import ECharts = echarts.ECharts;
import {MainComponentComponent} from "../main-component.component";


// Block
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import {Estadisticas} from '../../DTO/Estadisticas';

import {ResponseDTO} from '../../DTO/ResponseDTO';
import {Modulo1Excel} from "../../DTO/modulo1Excel";




@Component({
  selector: 'app-becas-subes',
  templateUrl: './becas-subes.component.html',
  styleUrls: ['./becas-subes.component.css']

})
export class BecasSubesComponent implements OnInit {

  options: any;
  imgBase64: string;

  estadisticas: Estadisticas[];
  respBlob: any;
  resp: ResponseDTO;
  data: any[];
  dataTitle: any[];
  @BlockUI() blockUI: NgBlockUI;
  imgF = new Image();
  optionsM: any;

  cities: Modulo1Excel[];
  selectedCity: any;
  OptionSelected: any;

  constructor(public app: MainComponentComponent, private router: Router, private http: ServiceBecasService) {
    this.app.activeIndex = 0;

    let dataUser =  JSON.parse(sessionStorage.getItem('DataUser'));
    if(dataUser === null){
      this.router.navigate(['/']);
    }

  }

  ngOnInit() {
    this.getCatFile();//select
    this.data = [];
    this.dataTitle = [];
    this.dataTitle.push('INGENIERIA EN SISTEMAS COMPUTACIONALES');
    this.dataTitle.push('IINGENIERIA INDUSTRIAL');
    this.dataTitle.push('INGENIERIA EN GESTION EMPRESARIAL');
    this.dataTitle.push('INGENIERIA MECATRONICA');
    this.dataTitle.push('CONTADOR PUBLICO');
    this.dataTitle.push('INGENIERIA ELECTRONICA');



    this.data.push({value: 0, name: 'INGENIERIA EN SISTEMAS COMPUTACIONALES \n Hombres: 0 \n Mujeres: 0'});
    this.data.push({value: 0, name: 'IINGENIERIA INDUSTRIAL \n Hombres: 0 \n Mujeres: 0'});
    this.data.push({value: 0, name: 'INGENIERIA EN GESTION EMPRESARIAL \n Hombres: 0 \n Mujeres: 0'});
    this.data.push({value: 0, name: 'INGENIERIA MECATRONICA \n Hombres: 0 \n Mujeres: 0'});
    this.data.push({value: 0, name: 'ICONTADOR PUBLICO \n Hombres: 0 \n Mujeres: 0'});
    this.data.push({value: 0, name: 'INGENIERIA ELECTRONICA \n Hombres: 0 \n Mujeres: 0'});
    this.DrawGrafica(this.dataTitle, this.data);
  }

  getExcel(event) {
    this.blockUI.start('Procesando Excel...'); // Start blocking
    let formdata = new FormData();
    formdata.append('excel', event.target.files[0], event.target.files[0].name);

    this.http.sendExcel(formdata).subscribe(
      (resp) => {//si es estutus 200 ejecuta
        this.getCatFile();//select
        this.resp = resp;
        if(this.resp.status) {
          this.estadisticas = [];
          this.estadisticas = this.resp.data as Estadisticas[];
          console.log(JSON.stringify(this.estadisticas));
          this.data = [];
          this.dataTitle = [];
          this.estadisticas.forEach( v => {
            this.dataTitle.push(v.nameCarrera );
            this.data.push({value: v.totalAlumnos, name: v.nameCarrera + ' \n Hombres: '+ v.hombres + '\n Mujeres:' + v.mujeres});
          });
          this.DrawGrafica(this.dataTitle, this.data);
        }else {
            console.log(this.resp.msg);
        }
        this.blockUI.stop();
      },
      (error) => {

        console.log('skdzksdb');
        this.blockUI.stop();
      }
    );
  }

  getPDF(){
    this.blockUI.start('Generando PDF...'); // Start blocking
    // Variables
    let formData = new FormData();
    let node = document.getElementById('image');
    let img = new Image();

    // Get Foto de Grafica
   htmlToImage.toPng(node).then(
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
      console.error('oops, something went wrong!', error);
    });

  }

  GeneratePDF(File: FormData) {
    // this.blockUI.start('Generando PDF...'); // Start blocking

    this.http.getPDF(File).subscribe(
      (resp) => {
        this.respBlob = resp;

        let blob = new Blob([this.respBlob], { type: 'application/pdf'});
        let a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        let ahora: Date = new Date();
        let nombreFile = 'Estadisticas Becas SUbes_'+ahora.getFullYear()+ahora.getMonth()+ahora.getDate()+ahora.getHours()+ahora.getMinutes()+ahora.getSeconds()+'.pdf';
        a.download = nombreFile;
        document.body.appendChild(a);
        a.click();


        console.log('Se realizó el post correctamente');
        this.blockUI.stop();
      },
      (error) => { console.log(error); this.blockUI.stop(); }
    );
  }

  DrawGrafica(dataTitle: any, Data: any) {
    this.options = {



      plugins: {
        datalabels: {
          color: 'white',
          backgroundColor: function(context) {
            return context.dataset.backgroundColor;
          },
          borderRadius: 5,
          display: function(context) {
            return context.dataset.data[context.dataIndex] > 0;
          },
          font: {
            weight: 'bold',
            size: 14,
            color: "black"
          },
          formatter: function(value, context,ap ='<?php echo json_encode($CalMat) ?>',rp ='<?php echo json_encode($CalMatR) ?>') {
            //para aprobados

            return   '8%';
          }
        }
      },

      title: {
        text: 'Estadisticas Becas Subes',
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
          name: 'Becas Subes',
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

  getCatFile() {
    this.http.getFiles().subscribe(
      (v) => {
        this.cities = v;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getEstadisticas(){

  }

  graficar() {
    //console.log(JSON.stringify(this.OptionSelected));
    this.http.graficarSelect(this.OptionSelected).subscribe(
      (resp) => {
        this.resp = resp;
        if(this.resp.status) {
          this.estadisticas = [];
          this.estadisticas = this.resp.data as Estadisticas[];
          console.log(JSON.stringify(this.estadisticas));
          this.data = [];
          this.dataTitle = [];
          this.estadisticas.forEach( v => {
            this.dataTitle.push(v.nameCarrera );
            this.data.push({value: v.totalAlumnos, name: v.nameCarrera + ' \n Hombres: '+ v.hombres + '\n Mujeres:' + v.mujeres});
          });
          this.DrawGrafica(this.dataTitle, this.data);
        }else {
          console.log(this.resp.msg);
        }
        this.blockUI.stop();
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
