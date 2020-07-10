const axios = require('axios');
const API_HOST = process.env.REACT_APP_API_HOST;
const FETCH_MENU_EP = API_HOST + 'api/menues';
const CREATE_ORDER_EP = API_HOST + 'api/orders/create';
const CONFIRM_PAYMENT_EP = API_HOST + 'api/orders/payment';
const UPDATE_ORDER_EP = API_HOST + 'api/orders/update';
const PAYMENT_INFO_EP = API_HOST + 'api/info/payment';
const SERVICE_INFO_EP = API_HOST + 'api/info/inservice';
const FETCH_HISTORY_EP = API_HOST + 'api/orders/history';
const ACTIVATE_EP = API_HOST + 'api/user/activate';

const QUEUE_HOST = 'https://moap-queue.mosin.jp/';
const NEW_QUEUE_EP = QUEUE_HOST + 'queue/new';
const UPDATE_ORDER_QUEUE_EP = QUEUE_HOST + 'queue/order';
const UPDATE_PAYMENT_EP = QUEUE_HOST + 'queue/payment';
const UPDATE_SERVICE_EP = QUEUE_HOST + 'queue/service';

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

export function activateRequest(studentNumber, address, publicKey) {
    return axios.post(ACTIVATE_EP, { studentNumber, address, publicKey})
        .then(res => res.data)
        .then(data => ({ data }))
        .catch(error => ({ error }));
}

export function newQueue(isMan) {
    return axios.post(NEW_QUEUE_EP, {isMan})
        .then(res => res.data)
        .then(data => ({data}))
        .catch(error => ({error}));
}

export function updateOrder(queue) {
    return axios.post(UPDATE_ORDER_QUEUE_EP, queue)
        .then(res => res.data)
        .then(data => ({data}))
        .catch(error => ({error}));
}

export function updatePayment(queue, orderId) {
    return axios.post(UPDATE_PAYMENT_EP, Object.assign({}, queue, { orderId }))
        .then(res => res.data)
        .then(data => ({data}))
        .catch(error => ({error}));
}

export function updateService(queue) {
return axios.post(UPDATE_SERVICE_EP, queue)
        .then(res => res.data)
        .then(data => ({data}))
        .catch(error => ({error}));
}

export function checkInService() {
    return axios.get(SERVICE_INFO_EP)
        .then(res => res.data)
        .then(inService => ({ inService }))
        .catch(inServiceError => ({ inServiceError}));

}

