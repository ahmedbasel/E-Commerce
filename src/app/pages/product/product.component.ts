import { Category } from './../../shared/interface/cart-product';
import { RouterLink } from '@angular/router';
import { Allproduct } from '../../shared/interface/allproduct';
import { ProductService } from './../../shared/services/product.service';
import { Component, inject } from '@angular/core';
import { LoaderComponent } from "../loader/loader.component";
import { SearchPipe } from '../../shared/pipe/search.pipe';
import { CurrencyPipe } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, distinctUntilChanged, startWith, switchMap, filter } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-product',
  imports: [RouterLink, LoaderComponent, SearchPipe, FormsModule, TranslatePipe, CurrencyPipe, ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  _ProductService=inject(ProductService);
  _ToastrService=inject(ToastrService)
  allproduct!:Allproduct[] ;
  currentPage: number = 1;
  totalPages!: any 
  isLoading: boolean = false;
  limit: any = 10;
  isadd:boolean=false
  addtowishlsit:boolean=false
  isexit:boolean=false
  searchval:string=''
  exit:any
  usercart:any
  _TranslateService=inject(TranslateService)
  page$ = new BehaviorSubject(1);
  allCategoryID!:any[] ;
  categoryControl = new FormControl('');
  pricelt?:number
  pricegt?:number
  IsLOGIN:boolean=false
  _AuthService=inject(AuthService)
  ngOnInit():void{
    localStorage.setItem('currentpage',"product");
      this.getallcategories()
      this.getproduct()
    this._AuthService.islogin.subscribe((val)=>{
      this.IsLOGIN=val;
    })
    

  
  }


  getallcategories(){
    this._ProductService.getallcategories().subscribe({
      next:(res)=>{
        console.log(res);
        this.allCategoryID=res.data
        console.log(this.allCategoryID);
        
      }
      ,
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  getproduct():void{
    this.isLoading = true;


   this.categoryControl.valueChanges
  .pipe(
    startWith(''),
    distinctUntilChanged(),

    switchMap(category =>
      
      this._ProductService.getallproduct(
        this.currentPage,
        this.limit,
        category,
        this.pricelt,
        this.pricegt,
      )
    ))
   .subscribe({
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
loadProducts() {

 

    this._ProductService.getallproduct(
    this.currentPage,
    this.limit,
    this.categoryControl.value,
    this.pricelt,
    this.pricegt,
  )
  .subscribe({

    next: (res) => {

      this.allproduct = res.data;

      this.totalPages = res.metadata.numberOfPages;

      this.isLoading = false;

    },

    error: (err) => {

      console.log(err);

      this.isLoading = false;

    }

  });

}
  nextpage():void{
    if(this.currentPage<this.totalPages){
      this.currentPage++;
      this.loadProducts()
    }
  }

  pervpage():void{
    if(this.currentPage>1){
      this.currentPage--;
     this.loadProducts()
    }
  }

  addtocart(id:any){


    if(localStorage.getItem("token") && this.IsLOGIN){
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
    }else{

      const titleerror = this._TranslateService.instant('toastr3.errorTitle');
      const messageerror = this._TranslateService.instant('toastr3.error');

this._ToastrService.error(
  titleerror,
  messageerror,
  {
    timeOut: 3000,
    progressBar: true,
    progressAnimation: 'increasing',
    closeButton: true,
    positionClass: 'toast-bottom-right',
    tapToDismiss: true
  }
);





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

     
      
      
    
   

  
  



 
  



