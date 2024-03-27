import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private isOpenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private productAddedSource = new Subject<void>();
  productAdded$ = this.productAddedSource.asObservable();

  url = environment.apiUrl
  http = inject(HttpClient)
  constructor() { }
  toggleCart(): void {
    this.isOpenSubject.next(!this.isOpenSubject.value);
  }
  // Method to check if cart is open
  isCartOpen(): Observable<boolean> {
    return this.isOpenSubject.asObservable();
  }
  addToCart(uId: any, data: any): Observable<any>{
  return  this.http.put<any>(`${this.url}/cart/addToCart/${uId}`, data)
  }
  notifyProductAdded(): void {
    this.productAddedSource.next();
  }
  getCartItems(userId: any): Observable<any>{
    return this.http.get<any>(`${this.url}/cart/getCart/${userId}`)
  }
}
