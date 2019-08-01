import { Component, OnInit } from '@angular/core';
import { RadioOptionModel } from 'app/shared/radio/radioOption.model';
import { OrderService } from './order-items/order.service';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html',
})
export class OrderComponent implements OnInit {

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  numberPattern = /^[0-9]*$/;
  orderForm: FormGroup;
  delivery: number = 8;

  paymentOptions: RadioOptionModel[] = [
    { label: 'Dinheiro', value: 'MONEY' },
    { label: 'Cartão de crédito', value: 'CARD' },
    { label: 'Vale-refeição', value: 'REF' }
  ];

  constructor(private orderService: OrderService, public router: Router, private FormBuilder: FormBuilder) { }

  ngOnInit() {
    this.orderForm = this.FormBuilder.group({
      name: this.FormBuilder.control('', [Validators.required, Validators.minLength(5)]),
      email: this.FormBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      confirmEmail: this.FormBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      address: this.FormBuilder.control('', [Validators.required, Validators.minLength(5)]),
      number: this.FormBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      optional: this.FormBuilder.control(''),
      paymentOption: this.FormBuilder.control('', [Validators.required])
    },
    {validator: OrderComponent.equalsTo}
    )
  }

  static equalsTo(group: AbstractControl): {[key: string]: boolean} {
    const email = group.get('email');
    const confirmEmail = group.get('confirmEmail');
    
    if(!email || !confirmEmail){
      return undefined;
    }
    if(email.value !== confirmEmail.value){
      return {emailsNotMatch: true}
    }
    return undefined;
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

  decreaseQty(item: CartItem) {
    return this.orderService.decreaseQty(item);
  }

  remove(item: CartItem) {
    return this.orderService.remove(item);
  }

  checkOrder(order: Order) {
    order.orderItems = this.cartItems().map((item: CartItem) => new OrderItem(item.quantity,
      item.menuItem.id))
    this.orderService.checkOrder(order).subscribe((orderId: string) => {
      this.router.navigate(['/order-summary'])
      // console.log(`compra concluída! Id: ${orderId}`)
    });
    this.orderService.clear();

    console.log(order);
  }

}
