import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'

import { workspaceReducer } from './reducers/workspace.reducer.js'
import { userReducer } from './reducers/user.reducer.js'

const rootReducer = combineReducers({
    workspaceModule: workspaceReducer,
    userModule: userReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))