import { Component ,inject} from '@angular/core';
import { FormControl, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule,TranslatePipe],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

restpassword = new FormGroup({
  email: new FormControl(localStorage.getItem('email') || ''),
  newPassword: new FormControl(null, [
    Validators.required,
    Validators.pattern(/^[A-Z].{6,15}$/)
  ])
});

  _AuthService= inject(AuthService);
  R=inject(Router)

  getdata(form:any){
    console.log(form);

    if(form.valid){


 
      this._AuthService.restpassword(form.value).subscribe({
        next:(res)=>{
          console.log(res);
        this.R.navigate(['/login'])
          
        },

        error:(err)=>{
          console.log(err);
          
        }
      })
    }
    
  }

  ngOnInit():void{
    localStorage.setItem('currentpage',"restpassword");
  }
}
