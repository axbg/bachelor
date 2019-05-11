import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer, { initialState } from './reducers/rootReducer';

export default function configureStore() {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk)
    )
}