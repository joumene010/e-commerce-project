import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit {

  displayedColumns: string[] = ['Image','Name', 'Description', 'Price' , 'Discounted Price' ,'Action'];
  cartDetails : any[] = [];

  constructor(private productService : ProductService,
    private router : Router) { }

  ngOnInit(): void {
    this.getCartDetails();
  }

  delete(cartId: any){
    console.log(cartId)
    this.productService.deleteCartItem(cartId).subscribe(
      (resp: any) => {
        console.log(resp);
        this.getCartDetails();

      },(error: any) =>{
        console.log(error);
      }
    )
  }

  getCartDetails(){

    this.productService.getCartDetails().subscribe(
      (response :any) => {
        console.log(response)
        this.cartDetails = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  checkout(){
   this.router.navigate(['/buyProduct', {
      isSingleProductCheckout: false, productId: 0
    }]);
     /*this.productService.getProductDetails(false, 0).subscribe(
     (resp) => {
         console.log(resp);
      },(error) =>{
        console.log(error);
      }
    );*/
  }

}
