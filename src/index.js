import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import {mainReducer} from './reducers/mainReducer';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas/fetchSaga'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const initialState = {};

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;



const store = createStore(
    mainReducer,
    initialState,
    composeEnhancers(
        applyMiddleware(sagaMiddleware)
    )
);

store.subscribe( ()=>{store.getState()});

sagaMiddleware.run(rootSaga);


ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>,
    document.getElementById('root'));


serviceWorker.unregister();
