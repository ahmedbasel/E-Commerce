import { Component,inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { ProductService } from './../../shared/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../shared/services/order.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule,TranslatePipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  addressform =new FormGroup({
    details:new FormControl(null,[Validators.required]),
    phone:new FormControl(null,[Validators.required]),
    city:new FormControl(null,[Validators.required]),

  })

  cartid!:string
  orderData: any;
  _ProductService=inject(ProductService);
  _ActivatedRoute=inject(ActivatedRoute);
  _ROUTER=inject(Router)
  _order=inject(OrderService)
   isloading:boolean=false


  checkout(form:any){

    let id =this._ActivatedRoute.snapshot.params?.['cartid'];
    let mytoken=localStorage.getItem('token')

    if(form.valid){
      this._ProductService.checkout(mytoken,form.value,id,).subscribe({
        next:(res)=>
        {

          console.log(res);
          location.href=res.session.url
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
      

    }
  }


  COD(form:any){

    let id =this._ActivatedRoute.snapshot.params?.['cartid'];
    let mytoken=localStorage.getItem('token')
    if(form.valid){
      this.isloading=true
      this._ProductService.COD(mytoken,form.value,id).subscribe({
        next:(res)=>
        {
          console.log(res);
          this.orderData=res.data
          console.log(this.orderData,"tttttt");
          this._order.setOrder(this.orderData);
          this.isloading=false
          
        
        
          this._ROUTER.navigate(['/COD'])
          
        }
        ,
        error:(err)=>
        {
         console.log(err);
         this.isloading=false
         
        }
      })
    }

  }

}
