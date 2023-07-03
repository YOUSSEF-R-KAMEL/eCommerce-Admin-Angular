import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getAllProducts(){
    return this.http.get( environment.baseAPI + 'products')
  }

  getAllCategories(){
    return this.http.get( environment.baseAPI + 'products/categories')
  }

  getProductsByCats(cat: string) {
    return this.http.get( environment.baseAPI + 'products/category/' + cat)
  }

  getProductByID(id:number){
    return this.http.get( environment.baseAPI + 'products/' + id)
  }

  createProduct(model:any){
    return this.http.post( environment.baseAPI + 'products', model)
  }

  UpdatePrd(model:any, id:number){
    return this.http.put( environment.baseAPI + 'products/' + id, model)
  }


}
