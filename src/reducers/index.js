import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import ui from './ui.js'
import socket from './socket.js'
import commits from './commits.js'
import commitsets from './commitsets.js'
import workers from './workers.js'
import nodes from './nodes.js'

const reducer = combineReducers({
    routing: routerReducer,
    ui,
    socket,
    commitsets,
    commits,
    workers,
    nodes,
})

export default reducer