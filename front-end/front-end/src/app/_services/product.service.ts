import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_model/Product.model';
import { OrderDetails } from '../_model/order-details.model';
import { MyOrderDetails } from '../_model/order.model';
import { Observable } from 'rxjs';
import { UserAuthService } from './user-auth.service';
import { Category } from '../_model/category.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient : HttpClient,
    private userAuth: UserAuthService
  ) { }
  requestHeader2 = new HttpHeaders({ 'No-Auth': 'True' });
  requestHeader = new HttpHeaders(
    { 'Authorization':'Bearer '+this.userAuth.getToken()
  });




  //-----------------------Product-------------------
  public addProduct(product:FormData,categoryId:any){
    return this.httpClient.post<Product>("http://localhost:9090/addNewProduct?id="+categoryId,product,{
      headers: this.requestHeader,
    })
  }

  public getAllProducts(pageNumber:any, searchKeyword: string= ""){
    return this.httpClient.get<Product[]>("http://localhost:9090/getAllProducts?pageNumber="+pageNumber+"&searchKey="+searchKeyword,{
      headers: this.requestHeader2,
    });
  }

  public getProductDetailsById(productId: string){
    return this.httpClient.get<Product> ("http://localhost:9090/getProductDetailsById/"+productId)
   }

  public deleteProduct(productId:number){
    return this.httpClient.delete("http://localhost:9090/deleteProductDetails/"+productId/*,{
      headers: this.requestHeader,
    }*/)
  }


  public getProductDetails(isSingeProductCheckout:any,productId:any){
    return this.httpClient.get<Product[]>("http://localhost:9090/getProductDetails/"+isSingeProductCheckout+"/"+productId,{
      headers: this.requestHeader,
    });
   }


  public addToCart(productId:number){
    return this.httpClient.get("http://localhost:9090/addToCart/"+productId,{
      headers: this.requestHeader,
    });
   }

   public getCartDetails(){
    return this.httpClient.get("http://localhost:9090/getCartDetails",{
      headers: this.requestHeader,
    });
   }


   public deleteCartItem(cartId:number){
    return this.httpClient.delete("http://localhost:9090/deleteCartItem/"+cartId,{
      headers: this.requestHeader,
    });
   }




   public placeOrder(orderDetails: OrderDetails, isCartCheckout: string){
    return this.httpClient.post("http://localhost:9090/placeOrder/"+isCartCheckout, orderDetails,{
      headers: this.requestHeader,
    });
   }


   public getMyOrders() : Observable<MyOrderDetails[]>{
    return this.httpClient.get<MyOrderDetails[]>("http://localhost:9090/getOrderDetails",{
      headers: this.requestHeader,
    });
   }

   public getAllOrderDetailsForAdmin() : Observable<MyOrderDetails[]>{
    return this.httpClient.get<MyOrderDetails[]>("http://localhost:9090/getAllOrderDetails",{
      headers: this.requestHeader,
    });
  }

  

  public getAllCategory(){
    return this.httpClient.get<Category[]>("http://localhost:9090/getAllCatgeory",{
      headers: this.requestHeader,
    });
  }

}
