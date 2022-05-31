import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../common/product";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  hasProducts: boolean = false;
  products: Product[] = [];
  productsOnPage: number = 0;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.listProducts();
  }

  private listProducts() {
    this.productService.getProductList(0)
      .subscribe(data => {
      this.products = data;
      this.productsOnPage = data.length;
      this.hasProducts = this.productsOnPage > 0;
    });
  }
}
