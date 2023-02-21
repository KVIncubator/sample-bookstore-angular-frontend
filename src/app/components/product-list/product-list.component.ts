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
  previousCategoryId: number = 1;
  hasProducts: boolean = false;
  products: Product[] = [];
  productsOnPage: number = 0;


  searchMode: boolean = false;

  pageNumber: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;

  constructor(private productService: ProductService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
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

    if (this.previousCategoryId != this.currentCategoryId) {
      this.pageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    this.productService.getProductList(this.currentCategoryId, this.pageNumber - 1, this.pageSize)
      .subscribe(this.processResult());
  }

  private handleSearchProducts() {
    const keyword: string = "" + this.route.snapshot.paramMap.get('keyword');
    this.productService.searchProducts(keyword, this.pageNumber - 1, this.pageSize)
      .subscribe(this.processResult());
  }

  private processResult() {
    return data => {
      let products = data.content;
      this.products = products;
      this.productsOnPage = products.length;
      this.hasProducts = this.productsOnPage > 0;
      this.pageNumber = data.number + 1;
      this.pageSize = data.size;
      this.totalElements = data.totalElements;
    }
  }

  updatePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.pageNumber = 1;
    this.listProducts();
  }
}
