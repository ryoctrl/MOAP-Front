import { createAction } from 'redux-act';

export const SELECT_MENU = 'SELECT_MENU';
export const CLEAR_CART = 'CLEAR_CART';
export const ADD_CART = 'ADD_CART';
export const SUB_CART = 'SUB_CART';
export const OPEN_CART = 'OPEN_CART';
export const CLOSE_CART = 'CLOSE_CART';

export const selectMenu = createAction(SELECT_MENU);
export const clearCart = createAction(CLEAR_CART);
export const addCart = createAction(ADD_CART);
export const subCart = createAction(SUB_CART);
export const openCart = createAction(OPEN_CART);
export const closeCart = createAction(CLOSE_CART);

export const PERFORM_PAYMENT = 'PERFORM_PAYMENT';
export const SUCCESS_PERFORM_PAYMENT = 'SUCCESS_PERFORM_PAYMENT';
export const FAILURE_PERFORM_PAYMENT = 'FAILURE_PERFORM_PAYMENT';

export const performPayment = createAction(PERFORM_PAYMENT);
export const successPerformPayment = createAction(SUCCESS_PERFORM_PAYMENT);
export const failurePerformPayment = createAction(FAILURE_PERFORM_PAYMENT);

export const FETCH_MENUS = 'FETCH_MENUS';
export const SUCCESS_FETCH_MENUS = 'SUCCESS_FETCH_MENUS';
export const FAILURE_FETCH_MENUS = 'FAILURE_FETCH_MENUS';

export const fetchMenus = createAction(FETCH_MENUS);
export const successFetchMenus = createAction(SUCCESS_FETCH_MENUS);
export const failureFetchMenus = createAction(FAILURE_FETCH_MENUS);

export const POST_ORDER = 'POST_ORDER';
export const SUCCESS_POST_ORDER = 'SUCCESS_POST_ORDER';
export const FAILURE_POST_ORDER = 'FAILURE_POST_ORDER';

export const postOrder = createAction(POST_ORDER);
export const successPostOrder = createAction(SUCCESS_POST_ORDER);
export const failurePostOrder = createAction(FAILURE_POST_ORDER);