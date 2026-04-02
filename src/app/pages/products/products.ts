import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsFacade } from '../../services/products.facade';
import { Product } from '../../models/product';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzButtonModule,
    NzInputModule,
    NzModalModule,
    NzSpinModule,
    NzEmptyModule,
    NzCardModule,
    NzFormModule,
  ],
  templateUrl: './products.html',
})
export class ProductsComponent {
  products$;
  loading$;
  error$;
  nameError = false;
  priceError = false;
  stockError = false;
  isModalVisible = false;
  isEditMode = false;
  newProduct: Product = {
    id: 0,
    name: '',
    price: 0,
    stock: 0,
  };

  constructor(
    private facade: ProductsFacade,
    private notification: NzNotificationService,
    private modal: NzModalService,
  ) {
    this.products$ = this.facade.products$;
    this.loading$ = this.facade.loading$;
    this.error$ = this.facade.error$;
  }

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.facade.setSearch(value);
  }

  openAddModal() {
    this.resetForm();
    this.isEditMode = false;
    this.isModalVisible = true;
  }

  editProduct(product: Product) {
    this.newProduct = { ...product };
    this.isEditMode = true;
    this.isModalVisible = true;
  }

  handleCancel() {
    this.isModalVisible = false;
  }

  handleOk() {
    let isValid = true;

    if (!this.newProduct.name?.trim()) {
      this.nameError = true;
      isValid = false;
    } else {
      this.nameError = false;
    }

    if (!this.newProduct.price || this.newProduct.price <= 0) {
      this.priceError = true;
      isValid = false;
    } else {
      this.priceError = false;
    }

    if (this.newProduct.stock == null || this.newProduct.stock < 0) {
      this.stockError = true;
      isValid = false;
    } else {
      this.stockError = false;
    }

    if (!isValid) return;

    if (this.isEditMode) {
      this.facade.updateProduct(this.newProduct);

      this.notification.success('Updated', 'Product updated successfully');
    } else {
      this.facade.addProduct({
        ...this.newProduct,
        id: Date.now(),
      });

      this.notification.success('Success', 'Product added successfully');
    }

    this.isModalVisible = false;
    this.resetForm();
  }

  deleteProduct(id: number) {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to delete this product?',
      nzContent: 'This action cannot be undone',
      nzOkText: 'Yes, Delete',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzCancelText: 'Cancel',

      nzOnOk: () => {
        this.facade.deleteProduct(id);
        this.notification.success('Deleted', 'Product deleted successfully');
      },
    });
  }

  resetForm() {
    this.newProduct = { id: 0, name: '', price: 0, stock: 0 };
    this.nameError = false;
  }
}
