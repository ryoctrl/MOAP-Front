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
    resetOrder,
    getNemRemain,
    setRemain,
} from './actions';
import sendToken, { getRemain }  from '../libs/nem';

import {
    fetchMenusRequest,
    postOrderRequest,
    confirmPaymentRequest
} from './api';

import {
    generateTransactionMessage
} from '../helpers/NemHelper';

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
    const user = yield select(state => state.user);
    const transactionMessage = generateTransactionMessage(orderData);
    const { data: paymentResult, error: paymentError } = yield call(sendToken, payload.total_price, transactionMessage, user.privateKey);
    if(paymentError && !paymentResult) {
        //TODO: Implement payment error
        return;
    }
    const { data, error } = yield call(confirmPaymentRequest, payload, paymentResult.hash);
    if(data && !error) {
        yield put(successPerformPayment({data}));
    } else {
        yield put(failurePerformPayment({error}));
    }

    yield call(async () => new Promise(res => setInterval(res, 1000)));
    yield put(getNemRemain());
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

function* remainFlow() {
    while(true) {
        const user = yield select(state => state.user);
        const { privateKey } = user;

        if(!privateKey) {
            yield call(async () => new Promise(res => setInterval(res, 1000)));
            continue;
        }

        const { remain, err } = yield call(getRemain, privateKey);
        if(remain && !err) {
            yield put(setRemain({remain}));
        } else {
            yield put(setRemain({remain: err.toString}));
        }
        yield call(async () => new Promise(res => setInterval(res, 2000)));
    }
}

function* nemInit() {
    yield fork(remainFlow);
}

export default function* rootSaga() {
    yield fork(socketFlow);
    yield fork(menuFlow);
    yield fork(orderFlow);
    yield fork(nemInit);
}
