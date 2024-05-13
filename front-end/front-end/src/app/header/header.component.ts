import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { UserAuthService } from '../_services/user-auth.service';
import { Router } from '@angular/router';
import { Category } from '../_model/category.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  categories: Category[] = [];
  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    public userService: UserService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadCategories()
  }

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/home']);
    window.location.reload();
    
  }

  

  public isAdmin(){
    return this.userAuthService.isAdmin();
  }

  public isUser(){
    return this.userAuthService.isUser();
  }

  public getProduct(){
    if(this.isAdmin()){
      this.router.navigate(['/productsAdmin']);
    }else{
      this.router.navigate(['/products']);
    }
   
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
