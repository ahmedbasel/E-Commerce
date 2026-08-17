import { Component,inject } from '@angular/core';
import { FormControl, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, RouterLink,TranslatePipe],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {

  _AuthService= inject(AuthService);
  R=inject(Router)

  iserror:boolean=false


  forgetpassword= new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email])
  })



  getdata(form:any){
    console.log(form);

    if(form.valid){
      this._AuthService.forgetpassword(form.value).subscribe({
        next:(res)=>{
          
          console.log(res);
          localStorage.setItem('email', form.value.email);
           this.iserror=false
          this.R.navigate(['/verifycode'])
        },
       error: (err) => {
     console.log(err);

  if (err.status === 404) {

    this.iserror = true;

    setTimeout(() => {
      this.iserror = false;
    }, 3000);

  }
}
      })
    }
    

  }
  ngOnInit():void{
    localStorage.setItem('currentpage',"forgetpassword");
  }
}
