import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { RouterModule } from '@angular/router';

import { Observable, map, shareReplay } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TokenAuthService } from '../../../services/tokenAuth.service';
import { DashboardService } from './dashboardService';
import * as echarts from 'echarts';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AngularMaterialModule, RouterModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  
})
export class DashboardComponent implements OnInit{
  count$!: Observable<any>;
  dashboardService = inject(DashboardService);
  products: any[] = [];
  menCount: number = 0;
  womenCount: number = 0;
  kidsCount: number = 0;
  timestamp = Date.now();
  @ViewChild('PieContainer', { static: true })  PieContainer!: ElementRef;
  @ViewChild('LineContainer', { static: true })  LineContainer!: ElementRef;
 
  ngOnInit(): void {
    this.count$ = this.dashboardService
      .getCount()
      .pipe(map((res) => res.count));
      
      this.dashboardService.getProducts().subscribe((data:any) => {
       if (data.products) {
          this.products = data.products;
          this.countCategories();
          this.renderPieChart()
          this.renderLineChart()
       }
      })
      
  }
  countCategories() {
    this.menCount = this.products
      .filter(product => product.category.name === 'Men')
      .reduce((total, product) => total + product.countInStock, 0);
    

      this.womenCount = this.products
      .filter(product => product.category.name === 'Women')
      .reduce((total, product) => total + product.countInStock, 0);
  
      this.kidsCount = this.products
      .filter(product => product.category.name === 'Kids')
      .reduce((total, product) => total + product.countInStock, 0);
     
  }
  renderPieChart(): void {
    const echartsElement: HTMLElement = this.PieContainer.nativeElement;
 
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
          roseType: 'radius', // Set roseType to 'radius/ area' for padding between sectors
          radius: '85%',
          data: [
            
            { value: this.menCount, name: 'Men' },
            { value: 5, name: '', label: { show: false } }, 
            { value: this.womenCount, name: 'Women'},
            { value: 5, name: '', label: { show: false } }, 
            { value: this.kidsCount, name: 'Kids'},
            { value: 5, name: '', label: { show: false } }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 5,
              shadowColor: '#000',
            },
            // focus: 'self', // Increase the gap between sectors
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
  renderLineChart() : void{
    const echartsElement: HTMLElement = this.LineContainer.nativeElement;

    if (!echartsElement) {
      console.error('Echarts container is not available');
      return;
    }

    const myChart = echarts.init(echartsElement);
    const option = {
      tooltip: {
       trigger: 'axis',
       
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



    
 




