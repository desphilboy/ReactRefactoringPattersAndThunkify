import {
  createStore, compose, combineReducers, applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import { reducer as form } from 'redux-form';
import { lookUp } from './reducers/look-up.reducer.js';
import { info } from './reducers/info.reducer.js';
import { pageInfo } from './reducers/pageInfo.reducer.js';

const initialState = {
  lookUp: {
    inProgress: false,
    data: false,
    error: false,
    nameTypes: [],
  },
  info: {
  	inProgress: false,
    data: false,
    error: false,
    animals: [],
  },
  pageInfo: {
  	petName: '',
  	petType: '',
  },
};

/* eslint-disable-next-line no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  lookUp,
  info,
  pageInfo,
  form,
});

export const store = createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk)));

console.log('store>>>>>>>>>>>>>', store);
console.log('state>>>>>>>>>>>>>', store.getState());
