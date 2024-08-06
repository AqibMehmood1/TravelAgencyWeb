import { CanActivateFn } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { Inject } from '@angular/core';
export const authGuard: CanActivateFn = (route, state) => {
  // const auth=Inject(AuthService);
  // const router=Inject(Router);
  
  // if(auth.isLoggedIn()){
  //   router.navigate(['/deshboard']);
  //   return true;
  // }
  // else{
  //   console.log("log in first")
  //   router.navigate(["/login"]);
  //   return false;
  // }
  return true;
};
