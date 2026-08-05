import { CanActivateFn,Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { catchError, EMPTY, first, map } from 'rxjs';
import { inject,PLATFORM_ID } from '@angular/core';
import { VerifyResponse } from '../interface/verify-response';
export const authGuard: CanActivateFn = (route, state) => {
  

  
  let _AuthonService=inject(AuthService)
  let _Router=inject(Router);
  let pid=inject(PLATFORM_ID);


  if(isPlatformBrowser(pid) ){
    return _AuthonService.verifytoken(localStorage.getItem('token')).pipe(
        first(),
        map ((res:VerifyResponse)=>{
            if(res.message==='verified'){
                _AuthonService.islogin.next(true);
                return true;
            }
            else{
                _AuthonService.islogin.next(false);
                return false;
            }
        }),
        catchError(error=>{
            console.error('AutoGuard Error:',error);
            _AuthonService.islogin.next(false);
            _Router.navigate(['login']);
            return EMPTY;
        })
    );

 } else{
  return true;
 }
 


};
