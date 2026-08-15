import { Injectable,PLATFORM_ID } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable,BehaviorSubject } from 'rxjs';
import { Login } from '../interface/login';
import { Register } from '../interface/register';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { pid } from 'process';
import { VerifyResponse } from '../interface/verify-response';
import { Updateuserdata } from '../interface/updateuserdata';
import { Updatepassword } from '../interface/updatepassword';
import { Userpassword } from '../interface/userpassword';
import { Code } from '../interface/code';
import { Newdatauser } from '../interface/newdatauser';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl; 
  _HttpClient=inject(HttpClient);

  pid=inject(PLATFORM_ID);
    R=inject(Router);
   user:any

  constructor() {
    

    if(isPlatformBrowser(this.pid)){
      if(localStorage.getItem('token')!==null){
        this.DoVerifyToken()
        
        

      }else{
        this.R.navigate(['/login']);
      }



      let currentpage =localStorage.getItem('currentpage');
      if(currentpage!=null){
        this.R.navigate([currentpage]);

      }

      
    }
   }


   
username=new BehaviorSubject(localStorage.getItem('username'))  

  


islogin = new BehaviorSubject<boolean>(
  localStorage.getItem('token') !== null
);
  login(userdata:Login):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/signin`,userdata);
  }

  signup(registerdata:Register):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/signup`,registerdata);
  }


  verifytoken(t:any){
    return this._HttpClient.get<VerifyResponse>(`${this.baseUrl}/api/v1/auth/verifyToken`,{
      headers:{
        token:t
      }
    })


   
  }

  updatedata(t:any,updateeddata:Updateuserdata):Observable<any>{
    return this._HttpClient.put(`${this.baseUrl}/api/v1/users/updateMe/`,updateeddata)

    
  }



  updatepassword(t:any,updatepassword:Updatepassword):Observable<any>{
    return this._HttpClient.put(`${this.baseUrl}/api/v1/users/changeMyPassword`,updatepassword)
  }

  forgetpassword(userpassword:Userpassword):Observable<any>{
   return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/forgotPasswords`,userpassword)
  }

  restcode(code:Code):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/api/v1/auth/verifyResetCode`,code)
   }
 
   restpassword(newdata:Newdatauser):Observable<any>{
    return this._HttpClient.put(`${this.baseUrl}/api/v1/auth/resetPassword`,newdata)
   }


  DoVerifyToken(){
    this.verifytoken(localStorage.getItem('token')).subscribe({
      next:(res)=>{
        console.log('verified');
        
        console.log(res);
         
      

       

        
      },
      error:(err)=>{
        console.log('errrrrrror');
        console.log(err);
        
        
      }
    })
  }
}
