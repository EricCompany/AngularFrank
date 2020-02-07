import { Component, OnInit } from '@angular/core';
// get Image of Div
import htmlToImage from 'html-to-image';

// Service
import {ServiceBecasService} from '../../Service/Modulo1/service-becas.service';

// Echarts
import * as echarts from 'echarts';
import ECharts = echarts.ECharts;


@Component({
  selector: 'app-becas-subes',
  templateUrl: './becas-subes.component.html',
  styleUrls: ['./becas-subes.component.css']
})
export class BecasSubesComponent implements OnInit {

  options: any;
  imgBase64: string;
  estadisticas: any;
  respBlob:any;


  constructor(private http: ServiceBecasService) { }

  ngOnInit() {
    this.DrawGrafica();
  }

  getExcel(event) {
     let formData = new FormData();
    let node = document.getElementById('image');

    let img = new Image();


    htmlToImage.toJpeg(node)
      .then(function (dataUrl): any {

        img.src = dataUrl;
        sessionStorage.setItem('img', img.src);

        // document.body.appendChild(img);
        //  this.img.src = dataUrl;
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });

    // view img Base64
    this.imgBase64 = sessionStorage.getItem('img');
    formData.append('imagen', event.target.files[0], 'grafica.png');
    // Call Service
    this.sendExcel(formData);
  }

  sendExcel(File: FormData) {
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

      },
      (error) => { console.log(error); }
    );
  }

  DrawGrafica() {
    this.options = {
      title: {
        text: '某站点用户访问来源',
        subtext: '纯属虚构',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            {value: 335, name: '直接访问'},
            {value: 310, name: '邮件营销'},
            {value: 234, name: '联盟广告'},
            {value: 135, name: '视频广告'},
            {value: 1548, name: '搜索引擎'}
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
