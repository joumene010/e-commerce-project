import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/Product.model';
import { ProductService } from '../_services/product.service';
import { ImageProcessingService } from '../image-processing.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-product-page-admin',
  standalone: true,
  imports: [MatFormFieldModule,MatIconModule,CommonModule,MatTableModule],
  templateUrl: './product-page-admin.component.html',
  styleUrl: './product-page-admin.component.css'
})
export class ProductPageAdminComponent implements OnInit {
  
  showLoadMoreProductButton = false;
  showTable = false;
  pageNumber: number = 0;
  productDetails : Product[] =[];
  displayedColumns: string[] = ['Id', 'Product Name', 'Product Description', 'Product Discounted Price', 'Product Actual Price' ,'Actions'];
  constructor(private productService: ProductService ,
    public imagesDialog: MatDialog,
    private imageProcessingService: ImageProcessingService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  searchByKeyword(searchkeyword: string | undefined){

    this.pageNumber= 0;
    this.productDetails= [];
    this.getAllProducts(searchkeyword);

  }

  public getAllProducts(searchKey: string =""){
    this.showTable = false;
    this.productService.getAllProducts(this.pageNumber, searchKey)
    .pipe(
      map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
    )
    .subscribe(
      (resp: Product[]) =>{
        console.log(resp);
        resp.forEach(product => this.productDetails.push(product));
        this.showTable=true;
        if(resp.length==2){
          this.showLoadMoreProductButton=true;
        }else{
          this.showLoadMoreProductButton=false;
        }
        // this.productDetails = resp;
      }, (error: HttpErrorResponse) => {
        console.log(error);
      }

    );
  }

  loadMoreProduct(){
    this.pageNumber= this.pageNumber+1;
    this.getAllProducts();
  }

  deleteProduct(productId: number){
    this.productService.deleteProduct(productId).subscribe(
      (resp)=> {
        this.productDetails= [];
        this.getAllProducts();
      },
      (error: HttpErrorResponse) => {
        console.log(error);}
    );    
  }

  showImages(product: Product){
    console.log(product);
    this.imagesDialog.open(ShowProductImagesDialogComponent, {
      data: {
        images: product.productImages
      },
      height: '500px',
      width: '800px'
    });

  }

  editProductDetails(productId: any){
    this.router.navigate(['/editProduct', {productId: productId}])
  }



}
