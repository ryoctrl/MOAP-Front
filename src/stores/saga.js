import io from 'socket.io-client';
import { fork, take, call, put, select, join } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import {
    fetchMenus,
    successFetchMenus,
    failureFetchMenus,
    postOrder,
    successPostOrder,
    failurePostOrder
} from './actions';

import {
    fetchMenusRequest,
    postOrderRequest
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

function* orderFlow() {
    while(true) {
        yield take(postOrder);
        const cart = yield select(state => state.cart.list);
        console.log(cart);
        const { data, error } = yield call(postOrderRequest, cart);
        if(data && !error) {
            yield put(successPostOrder({data}));
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
