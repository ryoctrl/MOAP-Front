import { combineReducers } from 'redux';
import cart from './cart';
import menu from './menu';
import order from './order';
import user from './user';
import page from './page';
import history from './history';
import queue from './queue';

export default combineReducers({
    menu,
    cart,
    order,
    user,
    page,
    history,
    queue,
});
