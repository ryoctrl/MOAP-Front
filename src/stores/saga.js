import io from 'socket.io-client';
import { fork, take, call, put, select, takeLatest, cancel } from 'redux-saga/effects';
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
    getNemRemain,
    setRemain,
    setPaymentInfo,
    setAddress,
    fetchHistory,
    fetchHistorySuccess,
    fetchHistoryFailure,
} from './actions';
import sendToken, { getRemain, getAddress }  from '../libs/nem';

import {
    fetchMenusRequest,
    postOrderRequest,
    updateOrderRequest,
    confirmPaymentRequest,
    fetchPaymentInfoRequest,
    fetchHistoryRequest,
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
    yield call(subscribe, socket);
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

function* paymentFlow(payloadObj) {
    const { payload } = payloadObj;
    const { privateKey, storeAddress, storePublicKey, mosaic, generationHash } = yield select(state => state.user);
    const transactionMessage = generateTransactionMessage(payload);
    const { data: paymentResult, error: paymentError } = yield call(sendToken, payload.total_price, transactionMessage, privateKey, storeAddress, storePublicKey, mosaic, generationHash);
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
    let previousTask = null;
    while(true) {
        yield take(postOrder);
        const cart = yield select(state => state.cart.list);
        const { order } = yield select(state => state.order);

        if(order === null || order.is_paid === true) {
            const { data, error } = yield call(postOrderRequest, cart);
            if(data && !error) {
                if(previousTask) yield cancel(previousTask);
                yield put(successPostOrder({data}));
                previousTask = yield takeLatest(performPayment, paymentFlow);
            } else {
                yield put(failurePostOrder({error}));
            }
            continue;
        }

        const { id: interruptedOrderId } = order;
        const { data, error } = yield call(updateOrderRequest, interruptedOrderId, cart);
        if(data && !error) {
            if(previousTask) yield cancel(previousTask);
            yield put(successPostOrder({data}));
            previousTask = yield takeLatest(performPayment, paymentFlow);
        } else {
            yield put(failurePostOrder({error}));
        }
    }
}

function* remainFlow() {
    while(true) {
        const user = yield select(state => state.user);
        const { privateKey, mosaic } = user;

        if(!privateKey) {
            yield call(async () => new Promise(res => setInterval(res, 1000)));
            continue;
        }

        const { remain, err } = yield call(getRemain, privateKey, mosaic);
        if((remain || remain === 0) && !err) {
            yield put(setRemain({remain}));
        } else {
            yield put(setRemain({remain: err.toString}));
        }
        yield call(async () => new Promise(res => setInterval(res, 2000)));
    }
}

function* fetchHistoryFlow() {
    while(true) {
        yield take(fetchHistory);

        const user = yield select(state => state.user);
        const { privateKey } = user;
        let { address } = user;

        if(!privateKey) continue;

        if(!address) {
            address  = getAddress(privateKey);
            yield put(setAddress(address));
        }

        const { data, error } = yield call(fetchHistoryRequest, address);
        if(data && !error) {
            yield put(fetchHistorySuccess(data));
        } else {
            yield put(fetchHistoryFailure(error));
        }
    }
}

function* fetchPaymentInfo() {
    const { data, error } = yield call(fetchPaymentInfoRequest);
    if(error && !data) return;
    yield put(setPaymentInfo(data));
}

function* nemInit() {
    yield fork(fetchPaymentInfo);
    yield fork(remainFlow);
}

function* fetchHistoryInit() {
    yield fork(fetchHistoryFlow);
    yield put(fetchHistory());
}

export default function* rootSaga() {
    yield fork(socketFlow);
    yield fork(menuFlow);
    yield fork(orderFlow);
    yield fork(nemInit);
    yield fork(fetchHistoryInit);
}
