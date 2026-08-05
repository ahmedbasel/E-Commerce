import { CanActivateFn,Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
export const notloginGuard: CanActivateFn = (route, state) => {

  let _AuthonService=inject(AuthService)
  let _Router=inject(Router);


  if(_AuthonService.islogin.value === false){

    return true
   }else{
    
    _Router.navigate(['/home'])
    return false
   }
 
  
};
