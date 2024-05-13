import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Product } from './_model/Product.model';
import { ImageProcessingService } from './image-processing.service';
import { ProductService } from './_services/product.service';
import { map } from 'rxjs';

export const productResolver :ResolveFn<Product>=(
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot
)=>{
const imageProcessingService =inject(ImageProcessingService)
   return inject(ProductService).getProductDetailsById(route.paramMap.get("productId")!).pipe(
    map(p=>imageProcessingService.createImages(p))
  )
}


