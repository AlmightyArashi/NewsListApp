import { createStore, applyMiddleware } from 'redux'
import { logger } from 'redux-logger';

import reducers, { reducerActions } from './reducers';

export const actions = reducerActions;
export default createStore(reducers, applyMiddleware(logger));