import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private isOpenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

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

  getCartItems(userId: any): Observable<any>{
    return this.http.get<any>(`${this.url}/cart/getCart/${userId}`)
  }
}
