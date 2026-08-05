import { Router, RouterLink } from '@angular/router';
import { AuthService } from './../../shared/services/auth.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { isErrored } from 'stream';
import { _ } from '@ngx-translate/core';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {


  _AuthService=inject(AuthService);
 _R= inject(Router)
   
   IERROR:Boolean=false;
   ISLOADING:Boolean=false;


  signup=new FormGroup({
    name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(12)]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z].{6,15}$/)]),
    rePassword:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z].{6,15}$/)]),
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)])
  },this.confrimpassword)

  confrimpassword(f:any){
    const password = f.get('password');
    const rePassword = f.get('rePassword');
  
    if(password && rePassword){
      if(password.value !== rePassword.value){
        rePassword.setErrors({ didntmatch:true });
      } else {
        rePassword.setErrors(null);
      }
    }
    return null;
  }
  
  

  getdata(form:any){
    console.log(form);

 
    if(form.valid){
      console.log('valid');
      this.ISLOADING=true;
      this._AuthService.signup(form.value).subscribe({
        next:(res)=>{console.log(res);
          this.IERROR=false;
          this.ISLOADING=false;
          this._R.navigate(['/login'])

        },
        error:(err)=>{
          console.log(err);
          this.ISLOADING=false;
          this.IERROR=true;

          setTimeout(()=>{
            this.IERROR=false

          },3000)
        }
      })


      
    }else{
      console.log('error');
      
    }
    
  }


  ngOnInit():void{
    localStorage.setItem('currentpage',"register");
  }
}
