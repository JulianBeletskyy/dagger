import * as types from './types'

const pingHandler = (id, response, args) => {
	return {
		type: types.SET_PING,
		id,
	}
}

export default {
	pingHandler,
}