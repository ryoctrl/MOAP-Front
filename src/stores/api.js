const axios = require('axios');
const API_HOST = process.env.REACT_APP_API_HOST;
const FETCH_MENU_EP = API_HOST + 'api/menues';
const CREATE_ORDER_EP = API_HOST + 'api/orders/create';
const CONFIRM_PAYMENT_EP = API_HOST + 'api/orders/payment';

export function fetchMenusRequest() {
    return axios.get(FETCH_MENU_EP)
        .then(res => res.data)
        .then(data => ({data}))
        .catch(error => ({error}));
}

export function confirmPaymentRequest(order) {
    return axios.post(CONFIRM_PAYMENT_EP, { order })
        .then(res => res.data)
        .then(data => ({data}))
        .catch(error => ({error}));
}

export function postOrderRequest(cart) {
    return axios.post(CREATE_ORDER_EP, {cart})
        .then(res => res.data)
        .then(data => ({data}))
        .catch(error => ({error}));
}

