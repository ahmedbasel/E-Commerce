import { Allproduct } from '../../shared/interface/allproduct';
import { ProductService } from './../../shared/services/product.service';
import { Component, effect, inject } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {

  _ProductService=inject(ProductService);

  allproduct!:Allproduct[];
  isadd:boolean=false

  userwishlist:any

 

  ngOnInit():void{
    localStorage.setItem('currentpage',"wishlist");

    // let mytoken=localStorage.getItem('token')
    this.getuserwishlist()
  

  }


  getuserwishlist(){
   this._ProductService.getuserwishlist().subscribe({
      next:(res)=>
      {

        console.log(res);
        this.allproduct=res.data
        console.log(this.allproduct);
        this._ProductService.numoflist.set(res.count)
        
        
      },
      error:(err)=>{
        console.log(err);
        
      }
      
    })
  }



  addtocart(id:any){
    // let mytoken=localStorage.getItem('token');
    this._ProductService.addtocart(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.isadd = true;
        setTimeout(() => {
          this.isadd = false;
        }, 3000);

        this._ProductService.numofcart.set(res.numOfCartItems)
        
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  deleteproduct(id:any){
    // let mytoken=localStorage.getItem('token');

    this._ProductService.deleteproductformwishlist(id).subscribe({
      next:(res)=>
      {
        console.log(res);
        
        this.allproduct = this.allproduct.filter((item) => item._id !== id);

        this.getuserwishlist()
    
      },
      error:(err)=>
      {
        console.log(err);
        
      }
    })
  }
 
}
