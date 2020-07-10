import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import saga from './saga';

const persistConfig = {
    key: 'MOAP-Front',
    storage,
    whitelist: ['user']
};

const persistedReducer = persistReducer(persistConfig, reducer);

export default function configureStore(initialState) {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        persistedReducer,
        initialState,
        applyMiddleware(sagaMiddleware),
    );

    const persistor = persistStore(store);
    sagaMiddleware.run(saga);
    return { store, persistor };
};