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

  @BlockUI() blockUI: NgBlockUI;



  constructor(public app: MainComponentComponent, private router: Router, private http: ServiceBecasService) {
    this.app.activeIndex = 0;
  }

  ngOnInit() {

    this.DrawGrafica();
  }

  getExcel(event) {
  }

  getPDF(){
    // Variables
    let formData = new FormData();
    let node = document.getElementById('image');
    let img = new Image();

    // Get Foto de Grafica
    htmlToImage.toPng(node)
      .then(function (dataUrl): any {

        img.src = dataUrl;
        sessionStorage.setItem('img', img.src);

        // document.body.appendChild(img);
        //  this.img.src = dataUrl;
      }).catch(function (error) {
      console.error('oops, something went wrong!', error);
    });

    // Get Img Base64
    this.imgBase64 = sessionStorage.getItem('img');

    // Save in FormData
    // formData.append('imagen', event.target.files[0], 'grafica.png');
    formData.append('imagen', this.imgBase64);

    // Delete BASE64 IMG Session
    sessionStorage.removeItem('img');
    this.estadisticas = [];

    // Call Service
    this.GeneratePDF(formData);
  }

  GeneratePDF(File: FormData) {
    this.blockUI.start('Generando PDF...'); // Start blocking

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

  DrawGrafica() {
    this.options = {
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
        data: ['Ing. Sistemas Computacionales', 'Contador Publico', 'Mecatronica']
      },
      series: [
        {
          name: 'Becas Subes',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            {value: 10, name: 'Ing. Sistemas Computacionales \n 5 Hombre \n 5 Mujeres'},
            {value: 13, name: 'Contador Publico \n 8 Hombre \n 5 Mujeres'},
            {value: 15, name: 'Mecatronica  \n 8 Hombre \n 7 Mujeres '}
          ],
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
  }}
