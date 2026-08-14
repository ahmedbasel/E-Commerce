import { RouterLink } from '@angular/router';
import { Allproduct, Category } from '../../shared/interface/allproduct';
import { ProductService } from './../../shared/services/product.service';
import { Component, inject } from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';
import { CurrencyPipe } from '@angular/common';
import { SearchPipe } from '../../shared/pipe/search.pipe';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { CartInfo } from '../../shared/interface/cart-info';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink,LoaderComponent,CurrencyPipe,SearchPipe,FormsModule,TranslatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

 _ProductService= inject(ProductService)
 _ToastrService=inject(ToastrService)
 _TranslateService=inject(TranslateService)
_AuthService=inject(AuthService)
 allproduct!:Allproduct[];
 isadd:boolean=false
 searchval:string=''
 isloading:boolean=false
  addtowishlsit:boolean=false
   IsLOGIN:boolean=false
  allcatgory!:Category[];
   
  ngOnInit():void{
     this.isloading=true
    localStorage.setItem('currentpage',"home");
  this._AuthService.islogin.subscribe((val)=>{
      this.IsLOGIN=val;
    })
    this._ProductService.getsomeproduct().subscribe({
      next:(res)=>{
        // console.log(res);
        this.allproduct=res.data.slice(0,20)
        // console.log(this.allproduct);
        this.isloading=false
        
        
      },
      error:(err)=>{
        // console.log(err);
        this._ToastrService.error(err.message)
      }
    })


    this._ProductService.getusercart().subscribe({
      next:(res)=>{
        // console.log(res);

        this._ProductService.numofcart.set(res.numOfCartItems)
        
      }
    })
this.getcategory();
  }

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
  
  addtocart(id:any){
   if(localStorage.getItem('token')&&this.IsLOGIN){
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

  getuserwishlist(){
  this._ProductService.getuserwishlist().subscribe({
    next:(res)=>
    {
      console.log(res);
      this._ProductService.numoflist.set(res.count)
      let wishlist = res.data;
     

     

     
      
      
    },

    error:(err)=>{console.log(err);
    }

   })
  }
  
 addtowishlist(id:any){


    if(localStorage.getItem("token"),this.IsLOGIN){
        this._ProductService.addproducttowishlist(id).subscribe({
          next:(res)=>
          {
            console.log(res);
            
            
            
            
            const message2 = this._TranslateService.instant('toastr2.wishlistAddSuccess');
            const title2 = this._TranslateService.instant('toastr2.successTitle');
  this._ToastrService.success(message2, title2, {
  timeOut: 3000,
  progressBar: true,
  progressAnimation: 'increasing',
  closeButton: true,
  positionClass: 'toast-bottom-right', 
  tapToDismiss: true
});
            this.getuserwishlist()

            
             
    
         
         
         
              setTimeout(() => {
                this.addtowishlsit=false;
      
              }, 3000);
              
            
    
          
          },
          error:(err)=>
          {
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
