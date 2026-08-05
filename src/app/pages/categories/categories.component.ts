import { Category } from '../../shared/interface/allproduct';
import { ProductService } from './../../shared/services/product.service';
import { Component, inject } from '@angular/core';
import { LoaderComponent } from "../loader/loader.component";
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-categories',
  imports: [LoaderComponent,TranslatePipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

  _ProductService=inject(ProductService)
  ngOnInit():void{
    localStorage.setItem('currentpage',"categories");
    this.getcategory();
  }


  allcatgory!:Category[];


  getcategory(){
    this._ProductService.getallcategories().subscribe({
      next:(res)=>
      {
        console.log(res);
        this.allcatgory=res.data
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
