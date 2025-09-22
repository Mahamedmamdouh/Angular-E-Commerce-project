import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product';
import { Product } from '../../models/Product';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
  menuType: string = 'default';
  sellerName: string = "";
  userName: string = "";
  searchResult: undefined | Product[];
  cartItems = 0;

  constructor(private route: Router, private product: ProductService) {}

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        // ✅ تعديل: تحقق إن البيانات موجودة ومتخزنة كـ Array قبل ما توصل لـ .name
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          let sellerStore = localStorage.getItem('seller');
          let parsedSeller = sellerStore && JSON.parse(sellerStore);
          if (Array.isArray(parsedSeller) && parsedSeller.length > 0) {
            let sellerData = parsedSeller[0];
            this.sellerName = sellerData.name || "";
            this.menuType = 'seller';
          }
        }
        // ✅ تعديل: تحقق إن الـ userData موجود قبل ما تستخدمه
        else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          if (userData && userData.name) {
            this.userName = userData.name;
            this.menuType = 'user';
            if (userData.id) {
              this.product.getCartList(userData.id);
            }
          }
        }
        else {
          this.menuType = 'default';
        }
      }
    });

    // ✅ كود عداد الكارت
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartItems = JSON.parse(cartData).length;
    }
    this.product.cartData.subscribe((items) => {
      this.cartItems = items.length;
    });
  }

  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }

  userLogout() {
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.product.searchProduct(element.value).subscribe((result) => {
        // ✅ تعديل: لو أكتر من 5 نتائج نقصهم لـ 5 بس
        if (result.length > 5) {
          result = result.slice(0, 5);
        }
        this.searchResult = result;
      });
    }
  }

  hideSearch() {
    this.searchResult = undefined;
  }

  redirectToDetails(id: number) {
    this.route.navigate(['/details/' + id]);
  }

  submitSearch(val: string) {
    console.warn(val);
    this.route.navigate([`search/${val}`]);
  }
}
