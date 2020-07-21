import io from 'socket.io-client';
import {
  fork,
  take,
  call,
  put,
  select,
  takeLatest,
  cancel,
  delay,
} from 'redux-saga/effects';
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
  setError,
  createNewQueue,
  updateQueueOrder,
  updateQueuePayment,
  updateQueueService,
  setQueue,
} from './actions';

import sendToken, { getRemain, getAddress, generateAccount } from '../libs/nem';

import * as userActions from './reducers/user';

import {
  fetchMenusRequest,
  postOrderRequest,
  updateOrderRequest,
  confirmPaymentRequest,
  fetchPaymentInfoRequest,
  fetchHistoryRequest,
  activateRequest,
  newQueue,
  updateOrder,
  updatePayment,
  updateService,
  checkInService,
} from './api';

import { generateTransactionMessage } from '../helpers/NemHelper';

const API_HOST = process.env.REACT_APP_API_HOST;

const connect = () => {
  const socket = io(API_HOST);
  return new Promise((resolve) => {
    socket.on('connect', () => resolve(socket));
  });
};

const subscribe = (socket) => {
  return eventChannel((emit) => {
    socket.on('orders.update', (message) => {
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
  while (true) {
    yield take(fetchMenus);
    const { data, error } = yield call(fetchMenusRequest);
    if (data && !error) {
      yield put(successFetchMenus({ data }));
    } else {
      yield put(failureFetchMenus({ error }));
    }
  }
}

function* paymentFlow(payloadObj) {
  const { inService = { inservice: false }, inServiceError } = yield call(
    checkInService,
  );
  if (!inService.inservice) {
    return put(
      setError(`PORDER${inService.message || '現在サービスが停止しています'}`),
    );
  }
  yield put(updateQueuePayment());
  const { payload } = payloadObj;
  const {
    privateKey,
    storeAddress,
    storePublicKey,
    mosaic,
    generationHash,
  } = yield select((state) => state.user);
  const transactionMessage = generateTransactionMessage(payload);
  const { data: paymentResult, error: paymentError } = yield call(
    sendToken,
    payload.total_price,
    transactionMessage,
    privateKey,
    storeAddress,
    storePublicKey,
    mosaic,
    generationHash,
  );
  if (paymentError && !paymentResult) {
    //TODO: Implement payment error
    return;
  }
  const { data, error } = yield call(
    confirmPaymentRequest,
    payload,
    paymentResult.hash,
  );
  if (data && !error) {
    yield put(updateQueueService());
    yield put(successPerformPayment({ data }));
  } else {
    yield put(failurePerformPayment({ error }));
  }

  yield call(async () => new Promise((res) => setInterval(res, 1000)));
  yield put(getNemRemain());
}

function* orderFlow() {
  let previousTask = null;
  while (true) {
    yield take(postOrder);
    const cart = yield select((state) => state.cart.list);
    const { order } = yield select((state) => state.order);

    if (order === null || order.is_paid === true) {
      const { data, error } = yield call(postOrderRequest, cart);
      if (data && !error) {
        if (previousTask) yield cancel(previousTask);
        yield put(successPostOrder({ data }));
        previousTask = yield takeLatest(performPayment, paymentFlow);
      } else {
        const { message } = error.response.data;
        yield put(setError(`CORDER${message}`));
        yield put(failurePostOrder({ error }));
      }
      continue;
    }

    const { id: interruptedOrderId } = order;
    const { data, error } = yield call(
      updateOrderRequest,
      interruptedOrderId,
      cart,
    );
    if (data && !error) {
      if (previousTask) yield cancel(previousTask);
      yield put(successPostOrder({ data }));
      previousTask = yield takeLatest(performPayment, paymentFlow);
    } else {
      yield put(failurePostOrder({ error }));
    }
  }
}

function* remainFlow() {
  while (true) {
    const user = yield select((state) => state.user);
    const { privateKey, mosaic } = user;

    if (!privateKey) {
      yield call(async () => new Promise((res) => setInterval(res, 1000)));
      continue;
    }

    const { remain, err } = yield call(getRemain, privateKey, mosaic);
    if ((remain || remain === 0) && !err) {
      yield put(setRemain({ remain }));
    } else {
      const msg = err.message;
      yield put(setRemain({ remain: '更新中' }));
    }
    yield call(async () => new Promise((res) => setInterval(res, 2000)));
  }
}

function* fetchHistoryFlow() {
  while (true) {
    yield take(fetchHistory);

    const user = yield select((state) => state.user);
    const { privateKey } = user;
    let { address } = user;

    if (!privateKey) continue;

    if (!address) {
      address = getAddress(privateKey);
      yield put(setAddress(address));
    }

    const { data, error } = yield call(fetchHistoryRequest, address);
    if (data && !error) {
      yield put(fetchHistorySuccess(data));
    } else {
      yield put(fetchHistoryFailure(error));
    }
  }
}

function* fetchPaymentInfo() {
  const { data, error } = yield call(fetchPaymentInfoRequest);
  if (error && !data) return;
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

function* userInit() {
  yield delay(500);
  const user = yield select((state) => state.user);
  if (user.privateKey) return;
  while (true) {
    console.log('waiting input student number!');
    const { payload } = yield take(userActions.initializeUserInfo);

    if (payload.sex === 'NONE') {
      yield put(setError('INIT性別を選択してください'));
      continue;
    }

    if (payload.studentNumber.length !== 10) {
      yield put(setError('INIT学籍番号は10桁で入力してください'));
      continue;
    }

    const account = generateAccount();
    console.log(account);
    Object.assign(payload, account);

    const { data, error } = yield call(
      activateRequest,
      payload.studentNumber,
      account.address,
      account.publicKey,
    );
    if (data && !error) {
      console.log('success initialize!!');
      yield put(userActions.setUserInfo(payload));
    } else {
      const { message } = error.response.data;
      yield put(setError('INIT' + (message || 'エラーが発生しました')));
    }
  }
}

function* newQueueFlow() {
  while (true) {
    yield take(createNewQueue);
    let user = yield select((state) => state.user);
    while (!user.sex) {
      user = yield select((state) => state.user);
    }

    const { data, error } = yield call(newQueue, user.sex === 'MALE');
    if (data && !error) {
      console.log(data);
      yield put(setQueue(data.queue));
      yield put(updateQueueOrder());
    }
  }
}

function* updateOrderFlow() {
  while (true) {
    yield take(updateQueueOrder);
    const queue = yield select((state) => state.queue.queue);
    if (queue && queue.id === -1) return;
    const { data, error } = yield call(updateOrder, queue);
    console.log(data);
    if (data && !error) {
      yield put(setQueue(data.queue));
    }
  }
}

function* updatePaymentFlow() {
  while (true) {
    yield take(updateQueuePayment);
    const {
      queue: { queue },
      order: { order },
    } = yield select((state) => (console.log(state), state));
    console.log(queue);
    console.log(order);
    if (!order) return;
    const orderId = order.id;

    console.log(orderId);
    if (queue && queue.id === -1) return;

    yield call(updatePayment, queue, orderId);
  }
}

function* updateServiceFlow() {
  while (true) {
    yield take(updateQueueService);
    const queue = yield select((state) => state.queue.queue);
    if (queue && queue.id === -1) return;
    yield call(updateService, queue);
    console.log('delaying 5 secs');
    yield delay(5000);
    console.log('forking new queue!');
    yield fork(loggerFlow);
  }
}

function* loggerFlow() {
  yield delay(1000);
  yield put(createNewQueue());
}

export default function* rootSaga() {
  yield fork(socketFlow);
  yield fork(menuFlow);
  yield fork(orderFlow);
  yield fork(nemInit);
  yield fork(fetchHistoryInit);
  yield fork(userInit);
  yield fork(newQueueFlow);
  yield fork(updateOrderFlow);
  yield fork(updatePaymentFlow);
  yield fork(updateServiceFlow);
  yield fork(loggerFlow);
}
