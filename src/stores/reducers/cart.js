import { createReducer } from 'redux-act';
import {
    clearCart,
    addCart,
    subCart,
    selectMenu,
    successPostOrder,
    openCart,
    closeCart,
} from '../actions';

const initialState = {
    isOpen: false,
    list: [],
    selecting: {id: -1}
};

export default createReducer({
    [selectMenu]: (state, payload) => {
        const newState = Object.assign({}, state);
        newState.selecting = payload;
        return newState;
    },
    [addCart]: (state, payload) => {
        const newState = Object.assign({}, state);
        const menuId = payload.id;
        const menuInList = newState.list.filter(menu => menu.id === menuId);

        if(menuInList.length === 0) {
            newState.list.push({ id: menuId, amount: 1});
        } else {
            menuInList[0].amount++;
        }
        return newState;
    },
    [subCart]: (state, payload) => {
        const newState = Object.assign({}, state);
        const menuId = payload.id;
        const menuInList = newState.list.filter(menu => menu.id === menuId);
        if(menuInList.length === 0) return state;
        if(menuInList[0].amount === 1) {
            newState.list = newState.list.filter(menu => menu.id !== menuId);
        } else {
            menuInList[0].amount--;
        }
        return newState;
    },
    [successPostOrder]: (state, payload) => {
        const newState = Object.assign({}, state);
        //newState.list = [];
        //newState.selecting = {id: -1}
        return newState;
    },
    [clearCart]: (state, payload) => {
        const newState = Object.assign({}, state);
        newState.list = [];
        return newState;
    },
    [openCart]: (state, payload) => {
        const newState = Object.assign({}, state);
        newState.isOpen = true;
        return newState;
    },
    [closeCart]: (state, payload) => {
        const newState = Object.assign({}, state);
        newState.isOpen = false;
        return newState;
    }
}, initialState);

