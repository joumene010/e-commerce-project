import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_model/Product.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-product',

  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  selectProductIndex = 0;
  product: Product |any;

  constructor(private activatedRoute: ActivatedRoute, private router : Router,
    private productService: ProductService) { }

  ngOnInit(): void {

   this.product = this.activatedRoute.snapshot.data['product'];
    console.log(this.product)
  }

  changeIndex(index:number){
    this.selectProductIndex=index;
  }

  async buyProduct(productId:number){
    console.log("ahmeddd"+productId)
    await this.router.navigate(['/buyProduct', {
      isSingleProductCheckout: true, productId: productId
    }]);
  }

  addToCart(productId:number){
    this.productService.addToCart(productId).subscribe(
      (response) => {
        console.log(response);
      },(error) => {
        console.log(error)
      }
    )

  }

}

