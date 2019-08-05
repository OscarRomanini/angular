import { CartItem } from "./cart-item.model";
import { MenuItem } from "../menu-item/menu-item.model";
import { Injectable } from "@angular/core";
import { NotificationsService } from "app/shared/messages/notifications.service";

@Injectable() //O serviço que vai receber outro serviço precisa do decorator @injectable

export class ShoppingCartService {

    constructor(public notificationsService: NotificationsService) {}

    items: CartItem[] = [];

    addItem(item: MenuItem) {
        let foundItem = this.items.find((mItem) => mItem.menuItem.id === item.id)
        //verifica se o item que está no carrinho tem o mesmo ID do item adicionado
        //Assim, se o item já for existente, só aumenta a quantidade
        if (foundItem) {
            this.increaseQty(foundItem)
        }else {
            this.items.push(new CartItem(item));
        }
        this.notificationsService.notify(`Você adicionou o item ${item.name}`);
    }

    removeItem(item: CartItem) {
        this.items.splice(this.items.indexOf(item), 1);
        //Remove um elemento a partir do indice encontrado no item que foi passado.
        this.notificationsService.notify(`Você removeu o item ${item.menuItem.name}`);
    }

    total(): number {
        return this.items
        .map(item => item.value())
        .reduce((previous, value) => previous + value, 0);
        //O MAP mapeia apenas o valor do objeto;
        //O REDUCE concatena o valor anterior com o atual (O 'zero' indica o valor inicial)
    }

    clear() {
        this.items = [];

    }

    increaseQty(item: CartItem) {
        item.quantity += 1;
    }

    decreaseQty(item:CartItem) {
        item.quantity -= 1;
        if (item.quantity === 0){
            this.removeItem(item);
        }
    }
}