import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  products: any[] = [];
  selectedProduct: any = null;
  productName: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  // Cargar productos desde la API
  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error al cargar los productos:', error);
      }
    );
  }

  // Método para crear un producto
  createProduct(): void {
    const newProduct = { name: 'Nuevo Producto', status: 1, stock: 200, description: 'Descripción', price: 100 };
    this.productService.createProduct(newProduct).subscribe(
      (response) => {
        console.log('Producto creado:', response);
        this.loadProducts();
      },
      (error) => {
        console.error('Error al crear el producto:', error);
      }
    );
  }

  // Método para actualizar un producto
  updateProduct(product: any): void {
    console.log("PRODUCTO A ACTUALIZAR: ", product)
    const updatedProduct = { ...product, name: 'Producto Actualizado', status: 1 };
    this.productService.updateProduct(product.productId, updatedProduct).subscribe(
      (response) => {
        console.log('Producto actualizado:', response);
        this.loadProducts();
      },
      (error) => {
        console.error('Error al actualizar el producto:', error);
      }
    );
  }

  captureInput() {
    this.products = []
    this.productService.getIdProducts(this.productName).subscribe(
      (data) => {
        console.log("DATA: ", data)
        this.products.push(data);
      },
      (error) => {
        console.error('Error al cargar el producto:', error);
      }
    );
  }

  obtenerTodos()
  {
    this.products = [];

    this.loadProducts();
  }

}
