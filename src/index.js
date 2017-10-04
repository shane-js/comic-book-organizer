import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import allReducers from './reducers'
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

let store = createStore(allReducers, {}, applyMiddleware(thunk, logger));
ReactDOM.render(
    <LocaleProvider locale={enUS}>
        <Provider store={store}>
            <App />
        </Provider>
    </LocaleProvider>, document.getElementById('root'));
registerServiceWorker();