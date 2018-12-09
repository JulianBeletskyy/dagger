import store from 'store'
import { setReady } from 'actions'
import handlers from 'actions/socket'

export const responseHandler = (msg_id, method, args, response) => {
    if(method!=="ping")
        console.log(msg_id, method, args, response)
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