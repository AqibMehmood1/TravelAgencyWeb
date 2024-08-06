// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

export interface LoginRequest {
  Username:string; 
  Password:string
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  

  private LoginUrl: string = "https://localhost:7208/api/Auth/Login";
  private RegisterUrl: string = "https://localhost:7208/api/RegisterUser/addUser";

  constructor(public http: HttpClient) { }
  Login(Request:LoginRequest){
    return this.http.post<any>(this.LoginUrl, Request);
  }

  Register(obj: any) {
    return this.http.post<any>(this.RegisterUrl, obj);
  }

  // SetToken(tokenValue: string) {
  //   localStorage.setItem('token', tokenValue);
  // }
  StoreUserValues(Data: any) {
    // debugger
    localStorage.setItem('token', Data.token);
    localStorage.setItem('id', Data.id);
    localStorage.setItem('name', Data.name);
    localStorage.setItem('password', Data.password);
    localStorage.setItem('roleDetails', Data.roleDetails);
    localStorage.setItem('userName', Data.userName);
  }
  

  getId() {
    return localStorage.getItem('id');
  }
  getToken() {
   return localStorage.getItem('token');
  }
  getName() {
    return localStorage.getItem('name');
  }
  getpassword() {
    return localStorage.getItem('password');
  }
  getroleDetails() {
    return localStorage.getItem('roleDetails');
  }
  getuserName() {
    return localStorage.getItem('userName');
  }
  isLoggedIn(): boolean {
    const token=this.getToken();
    if(!token){
      return false;
    }
    
    return !this.isTokenExpired();
  }

  private isTokenExpired():any{
    const token=this.getToken();
    if(!token){
      return true;
    }
    const decoded=jwtDecode(token);
    const isTokenExpired=Date.now()>decoded['exp']! * 1000;
    if (isTokenExpired) this.logout();
    return isTokenExpired;
  }

  logout():void{
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem('password');
    localStorage.removeItem('roleDetails');
    localStorage.removeItem('userName');
  }
}
