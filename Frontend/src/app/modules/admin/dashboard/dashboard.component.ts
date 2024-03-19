import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { jwtDecode } from 'jwt-decode';
import { RouterModule } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TokenAuthService } from '../../../services/tokenAuth.service';
import { DashboardService } from './dashboardService';
import * as echarts from 'echarts';
import { productModel } from '../../../shared/models/model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AngularMaterialModule, RouterModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [TokenAuthService],
})
export class DashboardComponent implements OnInit{
  count$!: Observable<any>;
  dashboardService = inject(DashboardService);
  products: any[] = [];
  menCount: number = 0;
  womenCount: number = 0;
  kidsCount: number = 0;

  @ViewChild('echartsPieContainer', { static: true })  echartsPieContainer!: ElementRef;
  @ViewChild('echartsColumnContainer', { static: true })  echartsColumnContainer!: ElementRef;
  menService: any;
  loaderService: any;
  ngOnInit(): void {
    this.count$ = this.dashboardService
      .getCount()
      .pipe(map((res) => res.count));
      
      this.dashboardService.getProducts().subscribe((data:any) => {
       if (data.products) {
          this.products = data.products;
          console.log("Products: ", this.products)
          this.countCategories();
          this.renderPieChart()
          this.renderColumnChart()
       }
      })
      
  }
  countCategories() {
    this.menCount = this.products
      .filter(product => product.category.name === 'Men')
      .reduce((total, product) => total + product.countInStock, 0);
      console.log("Men Count: ", this.menCount)

      this.womenCount = this.products
      .filter(product => product.category.name === 'Women')
      .reduce((total, product) => total + product.countInStock, 0);
      console.log("Women Count: ", this.womenCount)

      this.kidsCount = this.products
      .filter(product => product.category.name === 'Kids')
      .reduce((total, product) => total + product.countInStock, 0);
      console.log("Men Count: ", this.kidsCount)
  }
  renderPieChart(): void {
    const echartsElement: HTMLElement = this.echartsPieContainer.nativeElement;
 
    if (!echartsElement) {
      console.error('Echarts container is not available');
      return;
    }

    const myChart = echarts.init(echartsElement);
    const option = {
      title: {
        text: 'Categories',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      // legend: {
      //   orient: 'vertical',
      //   left: 'left'
      // },
      series: [
        {
          name: 'Category of',
          type: 'pie',
          radius: '80%',
          data: [
            { value: this.menCount, name: 'Men' },
            { value: this.womenCount, name: 'Women' },
            { value: this.kidsCount, name: 'Kids' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 20,
              shadowOffsetX: 0,
              shadowColor: '#668180',
            },
          },
          color: ['#ff6666', '#009933', '#80b3ff'], // Example colors
        },
      ],
    };

    myChart.setOption(option);

    myChart.on('error', function (error) {
      console.error('ECharts error:', error);
    });
  }
  renderColumnChart() : void{
    const echartsElement: HTMLElement = this.echartsColumnContainer.nativeElement;

    if (!echartsElement) {
      console.error('Echarts container is not available');
      return;
    }

    const myChart = echarts.init(echartsElement);
    const option = {
      tooltip: {
       trigger: 'axis',
       axisPointer: {
         type: 'shadow'
       }
     },
     xAxis: {
       type: 'category',
       data: ['Men', 'Women', 'Kids']
     },
     yAxis: {
       type: 'value'
     },
     series: [
       {
         data: [
          { 
          value: this.menCount,
          itemStyle: {
            color: '#ff6666'
          }
        },
        { 
          value: this.womenCount,
          itemStyle: {
            color: '#009933'
          }
        },
        { 
          value: this.kidsCount,
          itemStyle: {
            color: '#80b3ff'
          }
        },
        ],
         type: 'line'
       }
     ]
   };
   
   myChart.setOption(option);

    myChart.on('error', function (error) {
      console.error('ECharts error:', error);
    });
  }
  
 
}



    
 




