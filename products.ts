import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsFacade } from '../../services/products.facade';
import { Product } from '../../models/product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html'
})
export class ProductsComponent {

  readonly products$;
  readonly loading$;
  readonly error$;

  newProduct: Product = {
    id: 0,
    name: '',
    price: 0,
    stock: 0
  };

  editMode = false;

  constructor(private facade: ProductsFacade) {
    this.products$ = this.facade.products$;
  this.loading$ = this.facade.loading$;
  this.error$ = this.facade.error$;
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.facade.setSearch(value);
  }

  addProduct() {
    this.facade.addProduct({
      ...this.newProduct,
      id: Date.now()
    });

    this.resetForm();
  }

  editProduct(product: Product) {
    this.newProduct = { ...product };
    this.editMode = true;
  }

  updateProduct() {
    this.facade.updateProduct(this.newProduct);
    this.resetForm();
  }

  deleteProduct(id: number) {
    this.facade.deleteProduct(id);
  }

  resetForm() {
    this.newProduct = { id: 0, name: '', price: 0, stock: 0 };
    this.editMode = false;
  }
}