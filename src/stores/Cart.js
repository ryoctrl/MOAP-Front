import { createStore } from 'redux';

const initialCart = {
    cart: []
};

export function cartReducer(state=initialCart, action) {
    switch(action.type) {
        case 'ADD':
            return addReduce(state, action);
        case 'CLEAR':
            return clearReduce(state, action);
        default:
            return state;
    }
}

function addReduce(state, action) {
    const newCart = state.cart.slice();
    const newObj = {
        cart: newCart
    };
    const item = action.item;
    const amount = action.amount;

    if(!validate(item, amount)) {
        return newObj;
    };

    for(const order of newCart) {
        if(order.id !== item.id) continue;
        order.amount = amount;
        return newObj;

    }

    const orderItem = Object.assign({}, item);
    orderItem.amount = amount;
    newCart.push(orderItem);
    return {
        cart: newCart
    };
}

function clearReduce(state, action) {
    return {
        cart: []
    };
}


// action creators
export function addCart(item, amount) {
    return {
        type: 'ADD',
        item: item,
        amount: amount
    };
}

export function clearCart(item, amount) {
    return {
        type: 'CLEAR'
    };
}


// helpers
function validate(item, amount) {
    const numberCheck = Number.isNaN(Number(amount));
    const amountCheck = amount <= 0;
    return !(numberCheck || amountCheck);
}

export default createStore(cartReducer);
