const axios = require('axios');
const API_HOST = process.env.REACT_APP_API_HOST;
const FETCH_MENU_EP = API_HOST + 'api/menues';
const CREATE_ORDER_EP = API_HOST + 'api/orders/create';
const CONFIRM_PAYMENT_EP = API_HOST + 'api/orders/payment';
const UPDATE_ORDER_EP = API_HOST + 'api/orders/update';
const PAYMENT_INFO_EP = API_HOST + 'api/info/payment';
const FETCH_HISTORY_EP = API_HOST + 'api/orders/history';
const ACTIVATE_EP = API_HOST + 'api/user/activate';

export function fetchMenusRequest() {
    return axios.get(FETCH_MENU_EP)
        .then(res => res.data)
        .then(data => ({data}))
        .catch(error => ({error}));
}

export function confirmPaymentRequest(order, hash) {
    return axios.post(CONFIRM_PAYMENT_EP, { order, hash })
        .then(res => res.data)
        .then(data => ({data}))
        .catch(error => ({error}));
}

export function updateOrderRequest(id, cart) {
    return axios.post(UPDATE_ORDER_EP, { id, cart })
        .then(res => res.data)
        .then(data => ({data}))
        .catch(error => ({ error }));
}

export function postOrderRequest(cart) {
    return axios.post(CREATE_ORDER_EP, {cart})
        .then(res => res.data)
        .then(data => ({data}))
        .catch(error => ({error}));
}

export function fetchPaymentInfoRequest() {
    return axios.get(PAYMENT_INFO_EP)
        .then(res => res.data)
        .then(data => ({data}))
        .catch(error => ({error}));
}

export function fetchHistoryRequest(address) {
    return axios.get(FETCH_HISTORY_EP, { params: { address }})
        .then(res => res.data)
        .then(data => ({ data }))
        .catch(error => ({ error }));
}

export function activateRequest(studentNumber, address) {
    return axios.post(ACTIVATE_EP, { studentNumber, address })
        .then(res => res.data)
        .then(data => ({ data }))
        .catch(error => ({ error }));
}

