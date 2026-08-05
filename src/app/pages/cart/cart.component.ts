import { StorageService } from './../../shared/services/storage.service';
import { Product } from './../../shared/interface/cart-product';
import { Allproduct } from '../../shared/interface/allproduct';
import { CartProduct } from '../../shared/interface/cart-product';
import { ProductService } from './../../shared/services/product.service';
import { Component, inject } from '@angular/core';
import { LoaderComponent } from "../loader/loader.component";
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  imports: [LoaderComponent,RouterLink,TranslatePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

   _StorageService=inject(StorageService)
  _ProductService=inject(ProductService);
  _ToastrService=inject(ToastrService)


  allproduct!:CartProduct[];
  Shipping=80;
  Subtotal=0
  total=0;
  enableordersummary:boolean=false
  cartdata!:any
  isloading:boolean=false



  ngOnInit():void{
    this.isloading=true
    localStorage.setItem('currentpage',"cart");
    // let mytoken=localStorage.getItem('token')

    this.getusercart()
   
   
  }

 
  getusercart(){
     this._ProductService.getusercart().subscribe({
      next:(res)=>
      {


        console.log(res);
        this.allproduct=res.data.products
        this._ProductService.numofcart.set(res.numOfCartItems)
        this.cartdata=res

        console.log(this.cartdata);
        this.isloading=false
        

        if (this.allproduct && this.allproduct.length > 0) {
          this.enableordersummary = true;
        } else {
          this.enableordersummary = false;
        }
       
        console.log(this.allproduct);
        this.Subtotal=res.data.totalCartPrice
        this.total=this.Subtotal+this.Shipping

        
        
      },
      error:(err)=>
      {
        console.log(err);
        this.isloading=false
      }
    })
  }

  updatequantity(id:any,count:any){

    // let mytoken=localStorage.getItem('token')
    this._ProductService.Updatequantity(id,count).subscribe({
      next:(res)=>
      {
        console.log(res);
        this.allproduct=res.data.products
        this.Subtotal=res.data.totalCartPrice
        this.total=this.Subtotal+this.Shipping
        this._ToastrService.success('donnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnne')


      },
      error:(err)=>
      {
        console.log(err);
        
      }

    })

  }


  deleteprodcut(id:any){
    // let mytoken=localStorage.getItem('token')
    this._ProductService.deleteproductformcart(id).subscribe({
      next:(res)=>
      {
        console.log(res);
        this.allproduct=res.data.products
        this.Subtotal=res.data.totalCartPrice
        this.total=this.Subtotal+this.Shipping
        this._ProductService.numofcart.set(res.numOfCartItems)

        if (this.allproduct && this.allproduct.length > 0) {
          this.enableordersummary = true;
        } else {
          this.enableordersummary = false;
        }
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

 

  clearcart(){

    // let mytoken=localStorage.getItem('token')

    this._ProductService.Clearusercart().subscribe({
      next:(res)=>
      {
        console.log(res);
         this.getusercart()
        this.enableordersummary = false;
        
        
        

      },
      error:(err)=>
      {

        console.log(err);
        
      }
    })
    
    

  }
}
