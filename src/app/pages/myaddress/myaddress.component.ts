import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ProductService } from './../../shared/services/product.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-myaddress',
  imports: [TranslatePipe],
  templateUrl: './myaddress.component.html',
  styleUrl: './myaddress.component.css'
})
export class MyaddressComponent {

  _ProductService=inject(ProductService);
  _Router=inject(Router)

  addressdata:any[]=[]

  ngOnInit(){
    localStorage.setItem('currentpage',"My address");
    this.getuseraddress();
  }

  getuseraddress(){
    // let mytokn=localStorage.getItem('token')

    this._ProductService.getuseraddress().subscribe({
      next:(res)=>
      {
        console.log(res);
        this.addressdata=res.data
        console.log(this.addressdata);
        
        
      },
      error:(err)=>
      {

        console.log(err);
        
      }
    })
  }


  deleteaddress(id:any){
    // let mytokn=localStorage.getItem('token')
    this._ProductService.deleteaddress(id).subscribe({
      next:(res)=>
      {
         
        console.log(res);
        this.addressdata=res.data

      },
      error:(err)=>
      {
        console.log(err);

      }
    })

  }


  addadd(){
  this._Router.navigate(['/add-address']);
  }
  
}
