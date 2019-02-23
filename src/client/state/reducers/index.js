import { combineReducers } from 'redux'

import StateReducer, { USER_ACTIONS } from './state-reducer';

const reducers = combineReducers({
    applicationState: StateReducer,
});

export const reducerActions = { USER_ACTIONS };

export default reducers;