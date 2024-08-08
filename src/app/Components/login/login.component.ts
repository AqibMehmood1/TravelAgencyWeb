import { Component,OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { AuthService,LoginRequest } from '../../Services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder, public authService: AuthService,public Router:Router) {
    this.loginForm = this.fb.group({
      Username: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required]
    });
  }
ngOnInit(): void {
  // console.log('token :',this.authService.getToken());
  // console.log('IsLogged in :',this.authService.isLoggedIn());
  this.authService.logout();
  
}
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    debugger
    const Request:LoginRequest={
      Username: this.loginForm.get('Username')?.value,
      Password: this.loginForm.get('Password')?.value,

    };
    debugger
    if (this.loginForm.valid) {
      this.authService.Login(Request).subscribe((response: any) => {
        // Assuming the response contains the token
        const token = response.token;
        this.authService.StoreUserValues(response);
        // this.authService.logedin=true;

        // debugger
        console.log('Logged in successfully ');
        Swal.fire({
          title: 'Login Successful',
          text: 'Welcome to the Dashboard!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        // Router.navigate(['/deshboard']);
        this.Router.navigate(['/main']);
        console.log(response);

      },
      error => {
        Swal.fire({
          title: 'Login Failed',
          text: "Some errors occurse",
          icon: 'error',
          confirmButtonText: 'OK'
        });
        console.error('Error:', error);
      }
    );
    }
  }
  ShowLocalStoredData(){
    // debugger
    // console.log('token :',this.authService.getToken());
    // console.log('Id :',this.authService.getId());
    // console.log('Name :',this.authService.getName());
    // console.log('Role :',this.authService.getroleDetails());
    // console.log('UserName :',this.authService.getuserName());
    // console.log('IsLogged in :',this.authService.isLoggedIn());
    console.log('Logged in successfully ');
    Swal.fire({
      title: 'Login Successful',
      text: 'Welcome to the Dashboard!',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }
}
