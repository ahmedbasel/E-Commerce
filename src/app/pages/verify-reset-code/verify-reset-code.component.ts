import { Component ,inject} from '@angular/core';
import { FormControl, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-verify-reset-code',
  imports: [ReactiveFormsModule,TranslatePipe],
  templateUrl: './verify-reset-code.component.html',
  styleUrl: './verify-reset-code.component.css'
})
export class VerifyResetCodeComponent {

  
  _AuthService= inject(AuthService);
  R=inject(Router)

  iserror:boolean=false


  restcode=new FormGroup({
    resetCode:new FormControl(null,Validators.required)
  })



  getdata(form:any){
    console.log(form);

    if(form.valid){
      this._AuthService.restcode(form.value).subscribe({
        next:(res)=>{
          console.log(res);
          this.iserror=false
          this.R.navigate(['/restpassword'])
          
        },
        error:(err)=>{
          console.log(err);
          this.iserror=true

          setTimeout(()=>{
            this.iserror=false
          },3000)
          
        }
      })
    }
    
  }

  ngOnInit():void{
    localStorage.setItem('currentpage',"verifycode");
  }
}
