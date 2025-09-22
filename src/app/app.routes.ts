import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { SellerAuth } from './components/seller-auth/seller-auth';
import { SellerHome } from './components/seller-home/seller-home';
import { authGuard } from './auth-guard';
import { SellerAddProduct } from './components/seller-add-product/seller-add-product';
import { SellerUpdateProduct } from './seller-update-product/seller-update-product';
import { Search } from './search/search';
import { ProductDetails } from './components/product-details/product-details';
import { UserAuth } from './components/user-auth/user-auth';
import { CartPage } from './components/cart-page/cart-page';
import { Checkout } from './components/checkout/checkout';
import { MyOrders } from './components/my-orders/my-orders';

export const routes: Routes = [
  {
    path:'',component:Home,
  },
  {
    path:'seller-auth',component:SellerAuth,

  },
  {
    path:'seller-home',component:SellerHome,canActivate:[authGuard]

  },
  {
    path:'seller-add-product',component:SellerAddProduct,canActivate:[authGuard]

  },
  {
    path:'seller-update-product/:id',component:SellerUpdateProduct,canActivate:[authGuard]

  },
  {
    component: Search,
    path:'search/:query'
  },
  {
    component: ProductDetails,
    path:'details/:productId'
  },
  {
    component: UserAuth,
    path:'user-auth'
  },{
    component: CartPage,
    path:'cart-page'
  },{
    component: Checkout,
    path:'checkout'
  }
  ,{
    component: MyOrders,
    path:'my-orders'
  }
];
