import { CartItem } from './cart-item.model';
import { MenuItem } from '../menu-item/menu-item.model';

export class ShoppingCartService {
  items: CartItem[] = [];

  clear() {
    this.items = [];
  }

  addItem(item: MenuItem) {
    const foundItem = this.items.find((cartItem: CartItem) => cartItem.menuItem.id === item.id);
    if (foundItem) {
      foundItem.quantity += 1;
    } else {
      this.items.push(new CartItem(item));
    }
  }

  removeItem(item: CartItem) {
    this.items.splice(this.items.indexOf(item), 1);
  }

  total(): number {
    return this.items
      .map((cartItem: CartItem) => cartItem.value())
      .reduce((prev: number, value: number) => prev + value, 0);
  }
}
