import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Product } from '../_model/Product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ImageProcessingService } from '../image-processing.service';
import { Category } from '../_model/category.model';

@Component({
  selector: 'app-product-page',

  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit {
  categories: Category[] = [];
  pageNumber: number = 0;
  
  showLoadButton = false;
  productDetails:Product[]=[];
  constructor(private productService:ProductService,
    private imagesProcessingService:ImageProcessingService,
    private router : Router
  ){

  }
ngOnInit(): void {
  this.getAllProducts()
  this.loadCategories()
}

searchByKeyword(searchkeyword: any){

  this.pageNumber= 0;
  this.productDetails= [];
  this.getAllProducts(searchkeyword);

}

public getAllProducts(searchKey: string =""){
  this.productService.getAllProducts(this.pageNumber, searchKey)
  .pipe(
    map((x: Product[], i) => x.map((product: Product) => this.imagesProcessingService.createImages(product)))
  )
  .subscribe({next:response=>{console.log(response);
    if(response.length == 8){
      this.showLoadButton = true;
    }else{this.showLoadButton = false}
    response.forEach(p => this.productDetails.push(p));
    // this.productDetails = resp;
  console.log("ahmed")
  } ,
    error:error=>console.log(error)
    
    
  }
    /*(resp: Product[]) =>{
      console.log(resp);
      if(resp.length == 8){
        this.showLoadButton = true;
      }else{this.showLoadButton = false}
      resp.forEach(p => this.productDetails.push(p));
      // this.productDetails = resp;
    }, (error: HttpErrorResponse) => {
      console.log(error);
    }*/

  );
}

showProductDetails(productId:number){
  this.router.navigate(['/product' , {productId: productId}]);
}

public loadMoreProduct(){

  this.pageNumber = this.pageNumber+1;
  this.getAllProducts();
}


loadCategories(): void {
  this.productService.getAllCategory().subscribe(
    (data: Category[]) => {
      this.categories = data;
      console.log(this.categories)
    },
    (error) => {
      console.log('Error fetching categories:', error);
    }
  );
}
}

