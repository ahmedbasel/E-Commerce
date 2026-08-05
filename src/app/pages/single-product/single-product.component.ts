import { ProductService } from './../../shared/services/product.service';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { log } from 'console';
import { Allproduct } from '../../shared/interface/allproduct';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-single-product',
  imports: [CurrencyPipe],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.css'
})
export class SingleProductComponent {

  _ProductService=inject(ProductService);
  _ActivatedRoute = inject(ActivatedRoute);
 _ToastrService=inject(ToastrService)
 _TranslateService=inject(TranslateService)

  product!:Allproduct;
  ngOnInit():void{
    let pid=this._ActivatedRoute.snapshot.params?.['pid'];

    this._ProductService.getspecificProduct(pid).subscribe({
      next:(res)=>
      {
        console.log(res);
        this.product=res.data
        
      },
      error:(err)=>
      {
        console.log(err);
        
      }
    })
  }
  
  addtocart(id:any){
   
    this._ProductService.addtocart(id).subscribe({
      next:(res)=>{
        console.log(res,"ccccccccccccccccart");
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
  }
}
