import { ProductService } from './../../shared/services/product.service';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { log } from 'console';
import { Allproduct } from '../../shared/interface/allproduct';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { RelatedProductComponent } from "../related-product/related-product.component";
import { pid } from 'process';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-single-product',
  imports: [CurrencyPipe, RelatedProductComponent],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.css'
})
export class SingleProductComponent {
  IsLOGIN:boolean=false
  _ProductService=inject(ProductService);
  _ActivatedRoute = inject(ActivatedRoute);
 _ToastrService=inject(ToastrService)
 _AuthService=inject(AuthService)
 _TranslateService=inject(TranslateService)
 categortid:any
  product!:Allproduct;
  id:any
ngOnInit(): void {
this._AuthService.islogin.subscribe((val)=>{
      this.IsLOGIN=val;
    })
  this._ActivatedRoute.params.subscribe({
    next: (params) => {

    this.id=  params['pid'];

      this._ProductService.getspecificProduct(this.id).subscribe({
        next: (res) => {
          console.log(res);
          this.product = res.data;
           localStorage.setItem('currentpage',"single/"+this.id);
           
        },
        error: (err) => {
          console.log(err);
        }
      });

    }
  });

     


}

  
  
    addtocart(id:any){
   if(localStorage.getItem('token')&& this.IsLOGIN){
     this._ProductService.addtocart(id).subscribe({
      next:(res)=>{
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
        
      }
    })
   }else{
    const titleerror = this._TranslateService.instant('toastr3.errorTitle');
      const messageerror = this._TranslateService.instant('toastr3.error');

this._ToastrService.error(
 messageerror, titleerror,
  
  {
    timeOut: 3000,
    progressBar: true,
    progressAnimation: 'increasing',
    closeButton: true,
    positionClass: 'toast-bottom-right',
    tapToDismiss: true
  }
)
    
   }
  }

}
