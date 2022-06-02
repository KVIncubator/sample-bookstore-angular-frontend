import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {Product} from "../common/product";
import {ApiService} from "./api.service";
import {HttpParams} from "@angular/common/http";
import {ProductCategory} from "../common/product-category";

interface ProductPageResponse {
  content: Product[];
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private apiService: ApiService) {
  }

  getProductList(categoryId: number, pageNumber: number, pageSize: number): Observable<ProductPageResponse> {
    const params = {
      "page": pageNumber,
      "limit": pageSize,
    };
    return this.apiService.get(`/product-categories/${categoryId}/products`,
      new HttpParams({fromObject: params})).pipe(map(response => response as ProductPageResponse));
  }

  searchProducts(keyword: string, pageNumber: number, pageSize: number): Observable<ProductPageResponse> {
    const params = {
      "page": pageNumber,
      "limit": pageSize,
      "name": keyword
    };
    return this.apiService.get("/products",
      new HttpParams({fromObject: params}))
      .pipe(map(response => response as ProductPageResponse));
  }

  getProductCategoryList(): Observable<ProductCategory[]> {
    return this.apiService.get("/product-categories");
  }

  getProduct(productId: number): Observable<Product> {
    return this.apiService.get(`/products/${productId}`);

  }
}
