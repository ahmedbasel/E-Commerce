import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../shared/services/product.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-user-address',
  imports: [ReactiveFormsModule,TranslatePipe],
  templateUrl: './user-address.component.html',
   standalone: true,
  styleUrl: './user-address.component.css'
})
export class UserAddressComponent {

  address= new FormGroup({
    name: new FormControl(null,[Validators.required]),
    details: new FormControl(null,[Validators.required]),
    phone: new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
    city: new FormControl(null,[Validators.required])

  })

  _ProductService=inject(ProductService);
_Router=inject(Router)
  iserror!:boolean;
  isloading:boolean=false
  issuccess:boolean=false

  

  adduseraddress(form:any){
    // let mytoken=localStorage.getItem('token')
    
    if(form.valid){
      console.log(form);

      this.isloading=true
    
      this._ProductService.addaddress(form.value).subscribe({
        next:(res)=>
        {
          console.log(res);
          this.iserror=false
          this.isloading=false
          this.issuccess=true
          setTimeout(()=>{
            this.issuccess=false
          },3000)
          this._Router.navigate(['/My address'])
          
        },
        error:(err)=>
        {
          console.log(err);
          this.iserror=true
          this.isloading=false
          
        }
      })

      
    }
  }

}
