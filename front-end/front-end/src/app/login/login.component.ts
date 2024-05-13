import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { UserAuthService } from '../_services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login(loginForm: NgForm) {
    console.log(loginForm.value)
    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        if(response.user==null){
          console.log("not verified")
         //TODO : popup "your account is not verified" 
        }else{
          this.userAuthService.setRoles(response.user.role);
          this.userAuthService.setToken(response.jwtToken);
          console.log(response+this.userAuthService.getToken())
          const role = response.user.role[0].roleName;
  
          
          if (role === 'Admin') {
            this.router.navigate(['/']);
          } else {
            this.router.navigate(['/']);
          }
        }
     
      },
      (error:HttpErrorResponse) => {
       
        console.log(error);
      }
    );
  }
}
