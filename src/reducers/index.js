import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import ui from './ui.js'
import socket from './socket.js'

const reducer = combineReducers({
    routing: routerReducer,
    ui,
    socket,
})

export default reducer