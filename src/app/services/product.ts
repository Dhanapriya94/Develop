import { Injectable } from '@angular/core';
import { BehaviorSubject, of, delay } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsSubject = new BehaviorSubject<Product[]>([
    {
  id: 1,
  name: 'iPhone 14',
  price: 80000,
  stock: 15,
  category: 'Electronics',
  active: true,
  image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100&q=80'
},
{
  id: 2,
  name: 'Running Shoes',
  price: 2500,
  stock: 40,
  category: 'Fashion',
  active: true,
  image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=100&q=80'
},
{
  id: 3,
  name: 'Laptop',
  price: 65000,
  stock: 10,
  category: 'Electronics',
  active: false,
  image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&q=80'
}
  ]);

  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  products$ = this.productsSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  addProduct(product: Product) {
    this.loadingSubject.next(true);

    of(product)
      .pipe(delay(400))
      .subscribe({
        next: (p) => {
          const current = this.productsSubject.value;
          this.productsSubject.next([...current, p]);
          this.loadingSubject.next(false);
        },
        error: () => {
          this.errorSubject.next('Failed to add product');
          this.loadingSubject.next(false);
        },
      });
  }

  updateProduct(updated: Product) {
    this.loadingSubject.next(true);

    setTimeout(() => {
      const updatedList = this.productsSubject.value.map((p) =>
        p.id === updated.id ? updated : p,
      );

      this.productsSubject.next(updatedList);
      this.loadingSubject.next(false);
    }, 300);
  }

  deleteProduct(id: number) {
    this.loadingSubject.next(true);

    setTimeout(() => {
      const filtered = this.productsSubject.value.filter((p) => p.id !== id);
      this.productsSubject.next(filtered);
      this.loadingSubject.next(false);
    }, 300);
  }
}
