import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private http:HttpClient) { }

  getCarts(param?:any){
    let params = new HttpParams()
    params = params.append("startDate", param?.startdate).append("endDate", param?.enddate)
    return this.http.get(environment.baseAPI + 'carts', {params})
  }


  deleteCart(id:number){
    return this.http.delete(environment.baseAPI + 'carts/' + id)
  }
}
