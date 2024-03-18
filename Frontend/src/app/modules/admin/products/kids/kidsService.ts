import { Injectable, inject } from "@angular/core";
import { environment } from "../../../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { productModel } from "../../../../shared/models/model";
import { Observable, shareReplay } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class KidsService { 
    private _url = environment.apiUrl;
    private _http = inject(HttpClient)

    
    getProducts(): Observable<productModel[]>{
        return this._http.get<productModel[]>(`${this._url}/product/getAllProducts`).pipe(
              shareReplay()
        )
    }
}