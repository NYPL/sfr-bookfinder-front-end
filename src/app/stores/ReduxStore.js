import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import searchReducer from './Reducers';

export default createStore(searchReducer, applyMiddleware(thunk));
