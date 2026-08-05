import { RouterLink } from '@angular/router';
import { Allproduct } from '../../shared/interface/allproduct';
import { ProductService } from './../../shared/services/product.service';
import { Component, inject } from '@angular/core';
import { LoaderComponent } from "../loader/loader.component";
import { SearchPipe } from '../../shared/pipe/search.pipe';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-product',
  imports: [RouterLink, LoaderComponent,SearchPipe,FormsModule,TranslatePipe,CurrencyPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  _ProductService=inject(ProductService);
  _ToastrService=inject(ToastrService)
  allproduct!:Allproduct[] ;
  currentPage: number = 1;
  totalPages!: number 
  isLoading: boolean = false;
  limit: any = 10;
  isadd:boolean=false
  addtowishlsit:boolean=false
  isexit:boolean=false
  searchval:string=''
  exit:any
 _TranslateService=inject(TranslateService)


  ngOnInit():void{
    localStorage.setItem('currentpage',"product");
    this.getproduct()

    

  
  }

  getproduct():void{
    this.isLoading = true;
   
    this._ProductService.getallproduct(this.currentPage, this.limit).subscribe({
      next:(res)=>
      {
        console.log(res);
        this.allproduct=res.data;
        this.totalPages=res.metadata.numberOfPages;
        this.isLoading = false;
        
        
      },
      error:(err)=>{
        console.log(err);
        this.isLoading = false;
      }
    })
  }

  nextpage():void{
    if(this.currentPage<this.totalPages){
      this.currentPage++;
      this.getproduct();
    }
  }

  pervpage():void{
    if(this.currentPage>1){
      this.currentPage--;
      this.getproduct();
    }
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

  //  let mytoken=localStorage.getItem('token')

 

      
          this._ProductService.addproducttowishlist(id).subscribe({
          next:(res)=>
          {
            console.log(res);
            
            this.isexit=false
            
            
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

            
              // this.addtowishlsit=true;
    
         
         
         
              setTimeout(() => {
                this.addtowishlsit=false;
      
              }, 3000);
              
            
    
          
          },
          error:(err)=>
          {
            console.log(err);
            
          }
        })
      }

        
      
      
        
      }

     
      
      
    
   

  
  



 
  



