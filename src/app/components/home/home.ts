import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule,NgbCarouselModule,RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  popularProducts:undefined|Product[];
  trendyProducts:undefined | Product[];

 constructor(private product:ProductService) {}

 ngOnInit(): void {
    this.product.popularProducts().subscribe((data)=>{
      this.popularProducts=data;
    })

    this.product.trendyProducts().subscribe((data)=>{
      this.trendyProducts=data;
    })
  }

   addToCart(item: Product) {
    if (!localStorage.getItem('user')) {
      this.product.localAddToCart(item);
    } else {
      let userStore = localStorage.getItem('user');
      let userData = userStore && JSON.parse(userStore);
      let cartData = {
        ...item,
        productId: item.id,
        userId: userData.id
      };
      this.product.addToCart(cartData).subscribe((result) => {
        if (result) {
          this.product.getCartList(userData.id);
        
        }
      });
    }
  }

}
