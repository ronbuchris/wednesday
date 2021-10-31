import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'

import { workspaceReducer } from './reducers/workspace.reducer.js'
import { userReducer } from './reducers/user.reducer.js'
import { boardReducer } from './reducers/board.reducer.js'
import { groupReducer } from './reducers/group.reducer.js'
import { itemReducer } from './reducers/item.reducer.js'

const rootReducer = combineReducers({
    workspaceModule: workspaceReducer,
    userModule: userReducer,
    boardModule: boardReducer,
    groupModule: groupReducer,
    itemModule: itemReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))