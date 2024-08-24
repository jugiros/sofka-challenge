import { Component } from '@angular/core';
import {ProductDto} from "../../models/productDto";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  productos: ProductDto[] = [
    {
      logo: 'assets/logo1.png',
      nombre: 'Nombre del producto',
      descripcion: 'Descripción',
      fechaLiberacion: new Date('2000-01-01'),
      fechaReestructuracion: new Date('2001-01-01')
    }
  ];

  pageSize = 5;
  pageSizes = [5, 10, 20];

}
