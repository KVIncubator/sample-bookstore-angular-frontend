import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {Product} from "../common/product";
import {ApiService} from "./api.service";
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private apiService : ApiService) { }

  getProductList(page : number): Observable<Product[]> {
    const params = {
      "page": page
    };
    return this.apiService.get("/products", new HttpParams({ fromObject: params }))
      .pipe(map(res => res.content));
  }
}
