import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product';
import { Product } from '../../models/Product';
import { CommonModule } from '@angular/common';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  imports: [CommonModule, FontAwesomeModule, RouterLink],
  templateUrl: './seller-home.html',
  styleUrls: ['./seller-home.css'] 
})
export class SellerHome implements OnInit {
  productList: Product[] = []; 
  productMessage?: string;
  icon = faTrash;
  iconEdit = faEdit;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

 
  loadProducts(): void {
    this.productService.productList().subscribe({
      next: (products) => this.productList = products,
      error: (err) => console.error('Error loading products', err)
    });
  }

 
  deleteProduct(id?: number): void {
    if (!id) return;
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.productMessage = 'Product is deleted';
        this.loadProducts(); 
        setTimeout(() => this.productMessage = undefined, 3000);
      },
      error: (err) => console.error('Error deleting product', err)
    });
  }
}
