import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  orderSource = new BehaviorSubject<any>(null);
  currentOrder = this.orderSource.asObservable();

  setOrder(data: any) {
    this.orderSource.next(data);
  }

}
