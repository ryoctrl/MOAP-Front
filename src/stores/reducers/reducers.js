import { combineReducers } from 'redux';
import cart from './cart';
import menu from './menu';
import order from './order';
import page from './page';

export default combineReducers({
    menu, cart, order, page
});
