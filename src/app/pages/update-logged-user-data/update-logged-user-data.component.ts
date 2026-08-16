import { AuthService } from './../../shared/services/auth.service';
import { Component,inject,PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';



@Component({
  selector: 'app-update-logged-user-data',
  imports: [ReactiveFormsModule,TranslatePipe],
  templateUrl: './update-logged-user-data.component.html',
  styleUrl: './update-logged-user-data.component.css'
})
export class UpdateLoggedUserDataComponent {

  _AuthService= inject(AuthService)
  pid=inject(PLATFORM_ID);
  Iserror:boolean=false
  issuccess:boolean=false


  useremail=localStorage.getItem('gmail')
  username=localStorage.getItem('username')

  updatedata=new FormGroup({
    name:  new FormControl(this.username,[Validators.required,Validators.minLength(3),Validators.maxLength(12)]),

    email: new FormControl(this.useremail,[Validators.required,Validators.email]),

    phone: new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)])
  })



  getdata(form:any){
    console.log(form);

    if(form.valid){
     this._AuthService.updatedata(localStorage.getItem('token'),form.value).subscribe({
      next:(data)=>{console.log(data);
        console.log('succccccccccces');
        
        this._AuthService.username.next(data.user.name)
        this.issuccess=true

        setTimeout(()=>{
          this.issuccess=false
        },3000)
        
      },
      error:(err)=>{console.log(err);
        this.issuccess=false
       
        if(err.status==400){

           this.Iserror=true

           setTimeout(()=>{
            this.Iserror=false
           },3000)

          

        }
        
      }

     })

      }
      

    }

    ngOnInit():void{
      localStorage.setItem('currentpage',"updatedata");

      
       
      
    }
    
  }

