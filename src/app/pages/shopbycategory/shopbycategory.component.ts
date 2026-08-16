import { ProductService } from './../../shared/services/product.service';
import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-shopbycategory',
  imports: [RouterLink,TranslatePipe],
  templateUrl: './shopbycategory.component.html',
  styleUrl: './shopbycategory.component.css'
})
export class ShopbycategoryComponent {

 _ProductService= inject(ProductService)
  allcategory:any
  ngOnInit(){

    this.getcatgeor()
  }

  getcatgeor(){
    this._ProductService.getallcategories().subscribe({
      next:(res)=>{
        console.log(res);
        this.allcategory=res.data
      }
      ,
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
