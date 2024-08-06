import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { Inject } from '@angular/core';

export const authenticationGuard: CanMatchFn = (route, segments) => {
  const auth=Inject(AuthService);
  const router=Inject(Router);
  
  if(auth.logedin){
    // router.navigate(['/deshboard']);
    return true;
  }
  // else{
    console.log("log in first")
    // router.navigate(["/login"]);
    return router.navigate(["/login"]);

  // }
};
