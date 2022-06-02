import {Component, OnInit} from '@angular/core';
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
  searchMode: boolean = false;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  private listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }


  private handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    }

    this.productService.getProductList(this.currentCategoryId, 0)
      .subscribe(data => {
        this.products = data;
        this.productsOnPage = data.length;
        this.hasProducts = this.productsOnPage > 0;
      });
  }

  private handleSearchProducts() {
    const keyword: string = "" + this.route.snapshot.paramMap.get('keyword');
    this.productService.searchProducts(keyword, 0)
      .subscribe(data => {
        this.products = data;
        this.productsOnPage = data.length;
        this.hasProducts = this.productsOnPage > 0;
      });
  }
}
