import { AuthService } from './../../shared/services/auth.service';
import { Component,inject,PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-update-logged-user-password',
  imports: [ReactiveFormsModule,TranslatePipe],
  templateUrl: './update-logged-user-password.component.html',
  styleUrl: './update-logged-user-password.component.css'
})
export class UpdateLoggedUserPasswordComponent {
  _AuthService=inject(AuthService);
  iserror:boolean=false
  issuccess:boolean=false


  updatepassword=new FormGroup({
    currentPassword:new FormControl(null,[Validators.required]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z].{6,15}$/)]),
    rePassword: new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z].{6,15}$/)])
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
      this._AuthService.updatepassword(localStorage.getItem('token'),form.value).subscribe({
        next:(res)=>{console.log(res);

          console.log('yeeeeees done');
          this.issuccess=true
          setTimeout(()=>{
            this.issuccess=false
          },3000)
          
        },
        error:(err)=>{console.log(err);
          if(err.status==400){
            this.iserror=true
            setTimeout(()=>{
              this.iserror=false
            },3000)


          }
        }
      })
    }
    
  }

  ngOnInit():void{
    localStorage.setItem('currentpage',"Updatepassword");
  }
}
