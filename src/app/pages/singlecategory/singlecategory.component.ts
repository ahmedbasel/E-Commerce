import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import { map, filter } from 'rxjs';
import { LoaderComponent } from "../loader/loader.component";
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-singlecategory',
  imports: [LoaderComponent, RouterLink],
  templateUrl: './singlecategory.component.html',
  styleUrl: './singlecategory.component.css'
})
export class SinglecategoryComponent {
    _ActivatedRoute = inject(ActivatedRoute);
  _ProductService=inject(ProductService);
  allproduct:any
  id:any
  isLoading:boolean=false
  _ToastrService=inject(ToastrService)
  _TranslateService=inject(TranslateService)
  IsLOGIN:boolean=false
  _AuthService=inject(AuthService)
   categoryname:any
ngOnInit(): void {

  this.id = this._ActivatedRoute.snapshot.params['categID'];
     this.getproduct()
     this.getspecific()
     localStorage.setItem('currentpage',"ShopBY/"+this.id);

     this._AuthService.islogin.subscribe((val)=>{
      this.IsLOGIN=val;
    })
    }


    getspecific(){
      this._ProductService.getsepecatego(this.id).subscribe({
        next:(res)=>{
          console.log(res);
          this.categoryname=res.data.name
          console.log(this.categoryname);
          
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
    } 


    getproduct(){
      this._ProductService.getsomeproduct().pipe(
        map((res)=>{
          console.log(res);
          return res.data.filter((data:any)=>{
            return data.category?._id ===this.id
          })
          
        })
      ).subscribe({
        next:(res)=>{
          console.log(res);
         this.allproduct=res
         console.log(res);
         
         
          


          
          
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
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



}

