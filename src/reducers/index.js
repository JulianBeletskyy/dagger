import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import ui from './ui.js'
import socket from './socket.js'
import commits from './commits.js'
import commitsets from './commitsets.js'
import callables from './callable.js'
import workers from './workers.js'

const reducer = combineReducers({
    routing: routerReducer,
    ui,
    socket,
    commitsets,
    commits,
    callables,
    workers,
})

export default reducer