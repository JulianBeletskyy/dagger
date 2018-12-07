import * as types from 'actions/types';
import { HOST } from 'config';
import { responseHandler, onOpen } from 'api';

const initialState = {
	ping: 0,
	connection: false,
	client: {},
	ready: false,
	start_pings: {}
};

const socket = (socket = initialState, action = {}) => {
	switch (action.type) {
		case types.SET_PING:
			const ping = new Date() - socket.start_pings[action.id]
			let temp = socket.start_pings
			delete temp[action.id]
			return Object.assign({}, socket, {
				ping: ping,
				start_pings: temp,
				connection: true,
			})
		case types.SET_CONNECTION:
			return Object.assign({}, socket, {
				connection: action.value
			})
		case types.SET_READY:
			return Object.assign({}, socket, {
				ready: action.value
			})
		case types.SET_START_PING:
			return Object.assign({}, socket, {
				start_pings: {...socket.start_pings, [action.id]: action.date}
			})
		case types.SET_CLIENT:
			return Object.assign({}, socket, {
				client: action.client
			})
		default:
            return socket;
	}
}

export default socket