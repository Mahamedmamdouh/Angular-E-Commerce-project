import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product';
import { SignUp } from '../../models/SignUp';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../services/user';
import { Login } from '../../models/Login';
import { Product } from '../../models/Product';
import { Cart } from '../../models/Cart';

@Component({
  selector: 'app-user-auth',
  imports: [CommonModule,FormsModule],
  templateUrl: './user-auth.html',
  styleUrl: './user-auth.css'
})
export class UserAuth  implements OnInit{

   showLogin:boolean=true
  authError:string="";
    constructor(private user:User ,private product:ProductService) {}

      ngOnInit(): void {
    this.user.userAuthReload();
  }

  signUp(data: SignUp) {
    this.user.userSignUp(data);
  }
    login(data: Login) {
    this.user.userLogin(data)
    this.user.invalidUserAuth.subscribe((result)=>{
      console.warn(result);
      if(result){
         this.authError="User not found"
      }else{
        this.localCartToRemoteCart();
      }

    })
  }

    openSignUp(){
    this.showLogin=false
  }
  openLogin(){
this.showLogin=true;
  }
   localCartToRemoteCart(){
   let data = localStorage.getItem('localCart');
   let user = localStorage.getItem('user');
   let userId= user && JSON.parse(user).id;
   if(data){
    let cartDataList:Product[]= JSON.parse(data);

    cartDataList.forEach((product:Product, index)=>{
      let cartData:Cart={
        ...product,
        productId:product.id,
        userId
      }
      delete cartData.id;
      setTimeout(() => {
        this.product.addToCart(cartData).subscribe((result)=>{
          if(result){
            console.warn("data is stored in DB");
          }
        })
      }, 500);
      if(cartDataList.length===index+1){
        localStorage.removeItem('localCart')
      }
    })
   }


}}

