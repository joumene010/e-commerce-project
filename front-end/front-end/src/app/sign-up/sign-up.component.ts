import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {

  ngOnInit(): void {}

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  register(registerForm: NgForm) {
    console.log("aaaaaa")
    this.userService.register(registerForm.value).subscribe(
      (response: any) => {
        console.log(response)
        this.router.navigate(['/home']);
      },
      (error:HttpErrorResponse) => {
        if(error.status==200){
          this.router.navigate(['/home']);
        }
        
        console.log(error);
      }
    )
  }



}

