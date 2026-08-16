import { Allproduct } from '../../shared/interface/allproduct';
import { ProductService } from './../../shared/services/product.service';
import { Component, inject, Input } from '@angular/core';
import { filter, map } from 'rxjs';
import { LoaderComponent } from "../loader/loader.component";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
@Component({
  selector: 'app-related-product',
  imports: [LoaderComponent, RouterLink,TranslatePipe],
  templateUrl: './related-product.component.html',
  styleUrl: './related-product.component.css'
})
export class RelatedProductComponent {
  _ProductService=inject(ProductService)
   _TranslateService=inject(TranslateService)
  _ToastrService=inject(ToastrService)
  _ActivatedRoute = inject(ActivatedRoute);
   allproduct!:Allproduct[];
   Relatedproduct!:any[]
   isLoading:boolean=false
  addtowishlsit:boolean=false
  isadd:boolean=false
    isexit:boolean=false
  @Input() categoryId!: string;


    ngOnInit():void{
      let pid=this._ActivatedRoute.snapshot.params?.['pid'];
      
      this.getAllPRO()
 
    }

    getAllPRO(){
      
    this.isLoading = true;

this._ProductService.getsomeproduct().pipe(
  map((res) => {
    return res.data.filter((data:any) => {
      return data.category?._id === this.categoryId;
    });
  }),
  finalize(() => {
    this.isLoading = false;
  })
).subscribe({
  next: (res) => {
    this.Relatedproduct = res;
    console.log(res);
            


    
  },
  error: (err) => {
    console.log(err);
  }
});

    }

addtocart(id:any){
    let mytoken=localStorage.getItem('token');
    this._ProductService.addtocart(id).subscribe({
      next:(res)=>{
        console.log(res);
       this._ProductService.numofcart.set(res.numOfCartItems)
        
       const title = this._TranslateService.instant('toastr.successTitle');
      const message = this._TranslateService.instant('toastr.addToCartSuccess');

        
this._ToastrService.success(message,title, {
  timeOut: 3000,
  progressBar: true,
  progressAnimation: 'increasing',
  closeButton: true,
  positionClass: 'toast-bottom-right', 
  tapToDismiss: true
});

      

        
      },
      error:(err)=>{
        console.log(err);
        this.isadd=false
        
      }
    })
  }
}
