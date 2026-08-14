import { ProductService } from './shared/services/product.service';
import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./pages/navbar/navbar.component";
import { FooterComponent } from "./pages/footer/footer.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myapp';



ngOnInit():void{
  
  this.getuserwishlist()
  this.getusercart()

    

  
  }
  _ProductService=inject(ProductService)

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
  

 getusercart() {
  this._ProductService.getusercart().subscribe({
    next: (res) => {
  
      
      this._ProductService.numofcart.set(res.numOfCartItems);
    },
    error: (err) => {
      console.log(err);
    }
  });
}
}
