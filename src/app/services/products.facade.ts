import { Injectable } from '@angular/core';
import { ProductService } from './product';
import { Product } from '../models/product';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsFacade {
  private searchSubject = new BehaviorSubject<string>('');
  readonly search$ = this.searchSubject.asObservable();

  readonly products$!: Observable<Product[]>;
  readonly loading$;
  readonly error$;

  constructor(private productService: ProductService) {
    this.loading$ = this.productService.loading$;
    this.error$ = this.productService.error$;

    this.products$ = combineLatest([this.productService.products$, this.search$]).pipe(
      map(([products, search]) =>
        products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase())),
      ),
    );
  }

  setSearch(value: string) {
    this.searchSubject.next(value);
  }

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
