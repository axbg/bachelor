import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer, { initialState } from './reducers/rootReducer';

export default function configureStore() {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunkMiddleware, promiseMiddleware)
    )
}