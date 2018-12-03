import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import ui from './ui.js'
import socket from './socket.js'
import commits from './commits.js'

const reducer = combineReducers({
    routing: routerReducer,
    ui,
    socket,
    commits,
})

export default reducer