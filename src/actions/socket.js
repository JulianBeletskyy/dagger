import * as types from './types'

const pingHandler = (id, response, args) => {
	return {
		type: types.SET_PING,
		id,
	}
}

const buildHandler = (id, response, args) => {
	return {
		type: types.SET_BUILD_COMMIT,
		data: response,
	}
}

const get_dcommitsetsHandler = (id, response, args) => {
	return {
		type: types.SET_COMMITSET_LIST,
		list: response,
	}
}

const get_dcommitsetHandler = (id, response, args) => {
	return {
		type: types.SET_COMMITSET,
		data: response,
	}
}

const get_dcommitsHandler = (id, response, args) => {
	return {
		type: types.SET_COMMITS_LIST,
		list: response,
	}
}



export default {
	pingHandler,
	get_dcommitsetsHandler,
	buildHandler,
	get_dcommitsHandler,
	get_dcommitsetHandler,
}