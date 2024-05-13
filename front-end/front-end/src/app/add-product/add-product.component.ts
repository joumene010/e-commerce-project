import { Component, OnInit } from '@angular/core';
import { FileHandle } from '../_model/file-handle.model';
import { HttpErrorResponse } from '@angular/common/http';

import { Product } from '../_model/Product.model';
import { ProductService } from '../_services/product.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Category } from '../_model/category.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {
  categories: Category[] = [];
  category!:Category;
  product: Product = {
    productName: "",
    productDescription: "",
    productDiscountedPrice: 0,
    productActualPrice: 0,
    productImages: [],
    productId: undefined,
    category:this.category
  }
  selectedValue=null;
  constructor(private productService: ProductService,
    private sanitizer: DomSanitizer,
    private activatedRoute:ActivatedRoute) { }


  ngOnInit(): void {
    if(this.activatedRoute.snapshot.data['product']){
      this.product =this.activatedRoute.snapshot.data['product']//product li mawjouda fi resolve: fi app-routing
    }
    this.loadCategories()

  }

  addProduct(productForm:NgForm) {
    const productFormData=this.prepareFormData(this.product);
    this.productService.addProduct(productFormData,1).subscribe(
      (response: Product) => {
        productForm.reset();
        this.product.productImages=[];
        console.log(response);
      }, (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  prepareFormData(product: Product): FormData {
    const formData = new FormData();
    formData.append(
      'product',
      new Blob([JSON.stringify(product)], { type: 'application/json' })
    );

    for (var i = 0; i < product.productImages.length; i++) {
      formData.append(
        'imageFile',
        product.productImages[i].file,
        product.productImages[i].file.name
      );

    }
    return formData;
  }

  onFileSelected(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];

      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }
      this.product.productImages.push(fileHandle);
    }
  }

  removeImages(i:number){
    this.product.productImages.splice(i,1);
  }

  fileDropped(fileHandle:any){
    this.product.productImages.push(fileHandle)
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

