import { Component,inject } from '@angular/core';
import { OrderService } from '../../shared/services/order.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-cash-order',
  imports: [RouterLink],
  templateUrl: './cash-order.component.html',
  styleUrl: './cash-order.component.css'
})
export class CashOrderComponent {
  _order=inject(OrderService)

  order: any;

  ngOnInit() {
    this._order.currentOrder.subscribe((data) => {
      if (data) {
        this.order = data;
        console.log(this.order,"thissssssssssss order" );
        
      }
    });
  }
}

