import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AngularMaterialModule } from '../../../angular-material/angular-material.module';

@Component({
  selector: 'app-women',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule],
  templateUrl: './women.component.html',
  styleUrl: './women.component.css'
})
export class WomenComponent {
  items: any[] = [
    { name: 'Item 1', description: 'Description of Item 1 ', details: 'Details of Item 1 loremLorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat accusamus nam odit, vero ex molestias minus quos, minima quibusdam maiores soluta? Vero assumenda possimus accusamus nihil, necessitatibus soluta saepe deleniti?' },
    { name: 'Item 2', description: 'Description of Item 2', details: 'Details of Item 2' },
    { name: 'Item 3', description: 'Description of Item 3', details: 'Details of Item 3' }
  ];
  selectedItem: any;
  showDetails: boolean = false;
 searchKey: string = '';

  showItemDetails(item: any) {
    this.selectedItem = item;
    this.showDetails = true;
  }
  onClose(){
    this.selectedItem = null;
    this.showDetails = false;
  }
}
