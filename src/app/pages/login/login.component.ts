import { Component, inject } from '@angular/core';
import { FormControl, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import {jwtDecode} from 'jwt-decode'
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
ngOnInit(): void {

             localStorage.setItem('currentpage',"login");

     


}

  ISERROR:boolean=false;
  ISLOADING:boolean=false;

  _AuthService=inject(AuthService)
  _Router=inject(Router)


  login=new FormGroup({
    email:new FormControl(null,[Validators.email,Validators.required]),
    password:new FormControl(null,[Validators.required,])
  })

  getdata(form:any){
    console.log(form);
    

    if(form.valid){
      console.log('done');
      this.ISLOADING=true;

      this._AuthService.login(form.value).subscribe({
        next:(res)=>{
          console.log(res);
        this.ISERROR=false;
        this.ISLOADING=false;

        localStorage.setItem('token',res.token);
        let decocdedtoken= jwtDecode(res.token);
        console.log(decocdedtoken);

        let user=res.user.name
        let email=res.user.email
        localStorage.setItem('username',user);
        localStorage.setItem('gmail',email);



        this._AuthService.islogin.next(true)
        this._Router.navigate(['/home'])
        },
        error:(err)=>{console.log(err);
          this.ISERROR=true
          this.ISLOADING=false

          setTimeout(()=>{
            this.ISERROR=false

          },3000)

        }  
      })
      
      
    }else{
      console.log('error');
      
    }
    

  }

 

}
