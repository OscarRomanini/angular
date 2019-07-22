import { Component, OnInit } from '@angular/core';
import { RadioOptionModel } from 'app/shared/radio/radioOption.model';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  paymentOptions: RadioOptionModel[] = [
    {label: 'Dinheiro', value: 'MONEY'},
    {label: 'Cartão de crédito', value: 'CARD'},
    {label: 'Vale-refeição', value: 'REF'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
