import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerService } from '../../services/seller';
import { Router } from '@angular/router';
import { SignUp } from '../../models/SignUp';
import { Login } from '../../models/Login';

@Component({
  selector: 'app-seller-auth',
  imports: [FormsModule],
  templateUrl: './seller-auth.html',
  styleUrl: './seller-auth.css'
})
export class SellerAuth implements OnInit  {
  constructor(private seller:SellerService,private router:Router){}

   showLogin = signal(false);
   authError:String = '';

    ngOnInit():void{
    this.seller.reloadSeller()
}

  signUp(data: SignUp):void {

    console.log('Sign up data:', data);
    this.seller.userSignUp(data)
  }

 login(data: Login): void {
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authError="Email or password is not correct";
      }
    })
  }

openLogin() {
    this.showLogin.set(true);
  }

  openSignUp() {
    this.showLogin.set(false);
  }






}
