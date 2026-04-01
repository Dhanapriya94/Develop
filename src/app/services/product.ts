import { Injectable } from '@angular/core';
import { BehaviorSubject, of, delay } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsSubject = new BehaviorSubject<Product[]>([
    { id: 1, name: 'Laptop', price: 800, stock: 10 },
    { id: 2, name: 'Phone', price: 500, stock: 25 }
  ]);

  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  products$ = this.productsSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  addProduct(product: Product) {
    this.loadingSubject.next(true);

    of(product).pipe(delay(400)).subscribe({
      next: (p) => {
        const current = this.productsSubject.value;
        this.productsSubject.next([...current, p]);
        this.loadingSubject.next(false);
      },
      error: () => {
        this.errorSubject.next('Failed to add product');
        this.loadingSubject.next(false);
      }
    });
  }

  updateProduct(updated: Product) {
    this.loadingSubject.next(true);

    setTimeout(() => {
      const updatedList = this.productsSubject.value.map(p =>
        p.id === updated.id ? updated : p
      );

      this.productsSubject.next(updatedList);
      this.loadingSubject.next(false);
    }, 300);
  }

  deleteProduct(id: number) {
    this.loadingSubject.next(true);

    setTimeout(() => {
      const filtered = this.productsSubject.value.filter(p => p.id !== id);
      this.productsSubject.next(filtered);
      this.loadingSubject.next(false);
    }, 300);
  }
}