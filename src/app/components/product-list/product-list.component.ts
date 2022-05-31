import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../common/product";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  currentCategoryId: number = 1;
  hasProducts: boolean = false;
  products: Product[] = [];
  productsOnPage: number = 0;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  private listProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    console.log("listProducts ")
    if (hasCategoryId) {
      // @ts-ignore
      this.currentCategoryId = 0 + this.route.snapshot.paramMap.get('id');
    }

    this.productService.getProductList(this.currentCategoryId, 0)
      .subscribe(data => {
      this.products = data;
      this.productsOnPage = data.length;
      this.hasProducts = this.productsOnPage > 0;
    });
  }
}
