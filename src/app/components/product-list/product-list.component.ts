import { Component, HostListener } from '@angular/core';
import { ProductDto } from "../../models/productDto";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  selectedProductId: number | null = null;

  productos: ProductDto[] = [
    {
      id: 1,
      logo: 'assets/logo1.png',
      nombre: 'Nombre del producto',
      descripcion: 'Descripción',
      fechaLiberacion: new Date('2000-01-01'),
      fechaReestructuracion: new Date('2001-01-01')
    }
  ];

  constructor(private router: Router) {}

  @HostListener('document:click', ['$event'])
  clickOut(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.action-menu') && this.selectedProductId !== null) {
      this.selectedProductId = null;
    }
  }

  toggleMenu(productId: number) {
    this.selectedProductId = this.selectedProductId === productId ? null : productId;
  }

  editProduct(productId: number) {
    console.log('Edit product:', productId);
  }

  deleteProduct(productId: number) {
    console.log('Delete product:', productId);
  }

  createProduct() {
    this.router.navigate(['/create']);
  }

  pageSize = 5;
  pageSizes = [5, 10, 20];
}
