import * as types from './types'

const pingHandler = (id, response, args) => {
	return {
		type: types.SET_PING,
		id,
	}
}

const get_dcommitsetsHandler = (id, response, args) => {
	return {
		type: types.SET_COMMITS_LIST,
		list: response,
	}
}

export default {
	pingHandler,
	get_dcommitsetsHandler,
}