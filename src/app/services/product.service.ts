import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {Product} from "../common/product";
import {ApiService} from "./api.service";
import {HttpParams} from "@angular/common/http";
import {ProductCategory} from "../common/product-category";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private apiService : ApiService) { }

  getProductList(categoryId : number, page : number): Observable<Product[]> {
    const params = {
      "page": page,
      "category": categoryId
    };
    return this.apiService.get("/product-categories/" + categoryId + "/products",
      new HttpParams({ fromObject: params }))
      .pipe(map(res => res.content));
  }

  getProductCategoryList(): Observable<ProductCategory[]> {
    return this.apiService.get("/product-categories");
  }
}
