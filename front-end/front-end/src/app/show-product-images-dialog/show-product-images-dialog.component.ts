import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-show-product-images-dialog',
  standalone: true,
  imports: [MatFormFieldModule, MatGridListModule],
  templateUrl: './show-product-images-dialog.component.html',
  styleUrl: './show-product-images-dialog.component.css'
})
export class ShowProductImagesDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data:any){}
    ngOnInit(): void {  
      this.receiveImages();    
    }
  
    receiveImages(){
      console.log(this.data)
    }
  }
  