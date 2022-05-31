import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HttpClientModule} from "@angular/common/http";
import {ApiService} from "./services/api.service";
import {ProductService} from "./services/product.service";
import {ProductCategoryMenuComponent} from './components/product-category-menu/product-category-menu.component';
import {ProductListComponent} from './components/product-list/product-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductCategoryMenuComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [ApiService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
