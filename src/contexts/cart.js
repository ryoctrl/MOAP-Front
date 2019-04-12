import { createContext } from 'react';

const obj = {
    cart: [],
    addCart: function(item, amount) {
        if(Number.isNaN(Number(amount))) return;
        if(amount <= 0) return;

        for(const order of this.cart) {
            if(order.id !== item.id) continue;
            order.amount = amount;
            return;
        }

        const orderItem = Object.assign({}, item);
        orderItem.amount = amount;
        this.cart.push(orderItem);
        return;
    },
    getAmount: function(item) {
        for(const order of this.cart) {
            if(order.id !== item.id) continue;
            return order.amount;
        }

    }
};

const CartContext = createContext(obj);
export default CartContext;
