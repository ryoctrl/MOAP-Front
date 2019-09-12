import io from 'socket.io-client';
import { fork, take, call, put, select, join } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import {
    fetchMenus,
    successFetchMenus,
    failureFetchMenus,
    postOrder,
    successPostOrder,
    failurePostOrder,
    performPayment,
    successPerformPayment,
    failurePerformPayment,
} from './actions';
import sendToken from '../libs/nem';

import {
    fetchMenusRequest,
    postOrderRequest,
    confirmPaymentRequest
} from './api';

const API_HOST = process.env.REACT_APP_API_HOST;

const connect = () => {
    const socket = io(API_HOST);
    return new Promise(resolve => {
        socket.on('connect', () => resolve(socket));
    });
};

const subscribe = socket => {
    return eventChannel(emit => {
        socket.on('orders.update', message => {
            //emit(
        });
        return () => {};
    });
};

function* read(socket) {
    const channel = yield call(subscribe, socket);
}

function* handleIO(socket) {
    yield fork(read, socket);
}

function* socketFlow() {
    const socket = yield call(connect);
    yield fork(handleIO, socket);
}

function* menuFlow() {
    while(true) {
        yield take(fetchMenus);
        const { data, error } = yield call(fetchMenusRequest);
        if(data && !error) {
            yield put(successFetchMenus({data}));
        } else {
            yield put(failureFetchMenus({error}));
        }
    }
}

function* paymentFlow(orderData) {
    yield put(successPostOrder({data: orderData}));
    const { payload }  = yield take(performPayment);
    console.log('payload is below');
    console.log(payload);
    const { data, error } = yield call(confirmPaymentRequest, payload);
    console.log(data);
    if(data && !error) {
        yield put(successPerformPayment({data}));
    } else {
        yield put(failurePerformPayment({error}));
    }
}

function* orderFlow() {
    while(true) {
        yield take(postOrder);
        const cart = yield select(state => state.cart.list);
        const { data, error } = yield call(postOrderRequest, cart);
        if(data && !error) {
            yield fork(paymentFlow, data);
        } else {
            yield put(failurePostOrder({error}));
        }
    }
}

export default function* rootSaga() {
    yield fork(socketFlow);
    yield fork(menuFlow);
    yield fork(orderFlow);
}
