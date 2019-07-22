import { CartItem } from "./cart-item.model";
import { MenuItem } from "../menu-item/menu-item.model";

export class ShoppingCartService {

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
        console.log(item)
    }

    removeItem(item: CartItem) {
        this.items.splice(this.items.indexOf(item), 1);
        //Remove um elemento a partir do indice encontrado no item que foi passado.
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