import { Injectable, inject } from "@angular/core";
import { environment } from "../../../../../environments/environment.development";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, map, shareReplay, switchMap } from "rxjs";
import {  categoryModel, productModel } from "../../../../shared/models/model";

@Injectable({
    providedIn: 'root'
})

export class MenService{
    private _url = environment.apiUrl;
    private _http = inject(HttpClient)
  

   
    getProducts(): Observable<productModel[]>{
        return this._http.get<productModel[]>(`${this._url}/product/getAllProducts`).pipe(
              shareReplay()
        )
    }

    getCategories(): Observable<categoryModel[]>{
        return this._http.get<categoryModel[]>(`${this._url}/category/getCategories`).pipe(
            shareReplay()
        )
    }

    addProduct(data: any){
     return this._http.post(`${this._url}/product/addProduct`, data)
         
    }

    getProductById(){
        
    }

}