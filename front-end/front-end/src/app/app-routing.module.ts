import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductPageComponent } from './product-page/product-page.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductComponent } from './product/product.component';
import { HomeComponent } from './home/home.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { productResolver } from './product-resolve.service';
import { AppComponent } from './app.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductPageAdminComponent } from './product-page-admin/product-page-admin.component';
import { authGuard } from './_auth/auth.guard';

const routes: Routes = [
  { path: 'products', component: ProductPageComponent },
  { path: 'productsAdmin', component: ProductPageAdminComponent }, // Default route
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'product', component: ProductComponent, resolve: { product: productResolver } },
  { path: 'home', component: HomeComponent },
  { path: 'account', component:UserAccountComponent },
  { path: 'addProduct',component:AddProductComponent },
  {
    path: 'editProduct', component: AddProductComponent, canActivate: [authGuard], data: { roles: ['Admin'] },
    resolve: {
      product: productResolver
    }
  }
  
  
  // Other routes...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
