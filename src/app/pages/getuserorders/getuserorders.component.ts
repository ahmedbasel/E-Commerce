import { CartItem } from './../../shared/interface/orderdata';
import { Orderdata } from '../../shared/interface/orderdata';
import { OrderService } from './../../shared/services/order.service';
import { ProductService } from './../../shared/services/product.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-getuserorders',
  imports: [],
  templateUrl: './getuserorders.component.html',
  styleUrl: './getuserorders.component.css'
})
export class GetuserordersComponent {

 _ProductService= inject(ProductService);
  _OrderService=inject(OrderService);


  order:any
  orderdata: any[] = [];


  ngOnInit() {
    this._OrderService.currentOrder.subscribe((data) => {
      if (data) {
        this.order = data;
        console.log(this.order,"thissssssssssss order" );
        this.getUserOrders(this.order.user);
        
      }
    });

  }
   



  getUserOrders(userId: any) {
    this._ProductService.getuserorder(userId).subscribe({
      next: (res) => {
        console.log(res);
        this.orderdata=res
        console.log(this.orderdata);
        
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
