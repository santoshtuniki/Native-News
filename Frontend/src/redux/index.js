// module imports
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// component imports
import promiseMiddleware from '@MiddleWare/ApiCall';
import rootReducer from '@Reducer';

let middleware = [thunk, promiseMiddleware];

const reduxStore = createStore(
    rootReducer,
    compose(
        applyMiddleware(...middleware),
    ),
);

export default reduxStore;
