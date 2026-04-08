import { Injectable } from '@angular/core';
import { ProductService } from './product';
import { Product } from '../models/product';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsFacade {

  // 🔥 SINGLE SEARCH STATE
  private search$ = new BehaviorSubject<string>('');

  // 🔹 OUTPUT STREAMS
  readonly products$: Observable<Product[]>;
  readonly loading$;
  readonly error$;

  constructor(private productService: ProductService) {

    this.loading$ = this.productService.loading$;
    this.error$ = this.productService.error$;

    // 🔥 COMBINE PRODUCTS + SEARCH
    this.products$ = combineLatest([
      this.productService.products$, // base data
      this.search$
    ]).pipe(
      map(([products, search]) => {

        if (!search) return products;

        const term = search.toLowerCase();

        return products.filter(p =>
          p.name.toLowerCase().includes(term) ||
          (p.category || '').toLowerCase().includes(term) ||
          p.price.toString().includes(term) ||
          p.stock.toString().includes(term)
        );

      })
    );
  }

  // 🔹 SEARCH UPDATE
  setSearch(value: string) {
    this.search$.next(value);
  }

  // 🔹 CRUD
  addProduct(product: Product) {
    this.productService.addProduct(product);
  }

  updateProduct(product: Product) {
    this.productService.updateProduct(product);
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id);
  }
}