import store from 'store'
import { setAlert } from 'actions/ui'
import { setReady } from 'actions'
import handlers from 'actions/socket'

let withMessage = false

export const responseHandler = (msg_id, method, args, response) => {
    //console.log(msg_id, method, args, response)
    const handler = `${method}Handler`
    if (isFunction(handlers[handler])) {
        store.dispatch(handlers[handler](msg_id, response, args))
    }
}

export const onOpen = () => {
    store.dispatch(setReady(true))
}

const isFunction = (functionToCheck) => {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}