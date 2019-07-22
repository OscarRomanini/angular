import { Component, OnInit } from '@angular/core';
import { RadioOptionModel } from 'app/shared/radio/radioOption.model';
import { OrderService } from './order-items/order.service';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  delivery: number = 8;


  paymentOptions: RadioOptionModel[] = [
    {label: 'Dinheiro', value: 'MONEY'},
    {label: 'Cartão de crédito', value: 'CARD'},
    {label: 'Vale-refeição', value: 'REF'}
  ];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
  }

  itemsValue(): number {
    return this.orderService.itemsValue();
  }


  cartItems(): CartItem[] {
    return this.orderService.cartItems();
  }

  increaseQty(item: CartItem) {
    return this.orderService.increaseQty(item);
  }

  decreaseQty(item: CartItem){
    return this.orderService.decreaseQty(item);
  }

  remove(item: CartItem) {
    return this.orderService.remove(item);
  }

}
