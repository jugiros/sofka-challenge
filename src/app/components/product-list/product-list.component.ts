import { Component, HostListener, OnInit } from '@angular/core';
import { ProductDto } from "../../models/productDto";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { ProductService } from "../../services/product/product.service";
import { environment } from "../../environments/environment";
import { ToastService } from "../../services/common/toast.service";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  selectedProductId: string | null = null;
  private readonly endpointList = environment.endpoints.getProducts;

  products: ProductDto[] = [];
  paginatedProducts: ProductDto[] = [];
  pageSize = 5;
  pageSizes = [5, 10, 20];
  currentPage = 1;
  searchTerm: string = '';

  constructor(
    private router: Router,
    private productService: ProductService,
    private toastService: ToastService
  ) {}

  @HostListener('document:click', ['$event'])
  clickOut(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.action-menu') && this.selectedProductId !== null) {
      this.selectedProductId = null;
    }
  }

  toggleMenu(productId: string) {
    this.selectedProductId = this.selectedProductId === productId ? null : productId;
  }

  editProduct(productId: string) {
    console.log('Edit product:', productId);
  }

  deleteProduct(productId: string) {
    console.log('Delete product:', productId);
  }

  createProduct() {
    this.router.navigate(['/create-edit']);
  }

  filterProducts() {
    const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
    this.paginatedProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      product.description.toLowerCase().includes(lowerCaseSearchTerm)
    ).slice(0, this.pageSize);
  }

  onPageSizeChange(event: Event) {
    const target = event.target as HTMLSelectElement | null;
    if (target) {
      this.pageSize = +target.value;
      this.currentPage = 1;
      this.updatePaginatedProducts();
    }
  }

  updatePaginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedProducts = this.products.slice(startIndex, endIndex);
  }

  onSearchChange() {
    this.currentPage = 1;
    this.filterProducts();
  }

  loadProducts() {
    this.productService.getAllProducts(this.endpointList).subscribe({
      next: (response) => {
        this.products = response.data;
        this.filterProducts();
      },
      error: (error) => {
        this.toastService.showToast('Error al consumir el servicio!', 'error');
      }
    });
  }

  ngOnInit() {
    this.loadProducts();
  }
}
