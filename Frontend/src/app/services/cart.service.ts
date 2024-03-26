import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private isOpenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }
  toggleCart(): void {
    this.isOpenSubject.next(!this.isOpenSubject.value);
  }
  // Method to check if cart is open
  isCartOpen(): Observable<boolean> {
    return this.isOpenSubject.asObservable();
  }
}
