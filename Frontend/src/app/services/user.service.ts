import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { userModel } from '../shared/models/model';
import { Observable } from 'rxjs';
import { TokenAuthService } from './tokenAuth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _URL = environment.apiUrl;
  constructor(private _http: HttpClient) { }
  userToken : any
  userTokenInterceptor = inject(TokenAuthService)

  userRegister(data: any){
    return this._http.post<userModel>(`${this._URL}/user/register`, data, {
      headers: new HttpHeaders().set('Content-Type','application/json')
    })
  }


  userLogin(data: any){
    return this._http.post(`${this._URL}/user/login`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  getUserById(uId: any): Observable<userModel>{
    return this._http.get<userModel>(`${this._URL}/user/getById/${uId}`)
  }
  
  updateUser(uId: any, data: any){
    return this._http.patch(`${this._URL}/user/update/${uId}`, data)
}

  getPasswordResetLink(data: any): Observable<any>{
    return this._http.post<any>(`${this._URL}/user/reset-password`, data)
  }

  updatePassword(data: any): Observable<any> {
    return this._http.post<any>(`${this._URL}/user/update-password`, data)
  }

  addToWishList(userId: any, data: any) : Observable<userModel> {
      return this._http.patch<userModel>(`${this._URL}/user/addToWishList/${userId}`, { product: data })
  }
}
