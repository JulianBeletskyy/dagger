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

const get_dcommitHandler = (id, response, args) => {
	return {
		type: types.SET_COMMIT,
		data: response,
	}
}

const get_dcallableHandler = (id, response, args) => {
	return {
		type: types.SET_CALLABLE,
		data: response,
	}
}

const get_workersHandler = (id, response, args) => {
	return {
		type: types.SET_WORKERS,
		data: response,
	}
}

const get_worker_logsHandler = (id, response, args) => {
	return {
		type: types.SET_WORKER_LOGS,
		data: response,
	}
}

const get_nodesHandler = (id, response, args) => {
	return {
		type: types.SET_NODES,
		data: response,
	}
}

const get_nodeHandler = (id, response, args) => {
	return {
		type: types.SET_NODE,
		data: response,
	}
}


export default {
	pingHandler,
	get_dcommitsetsHandler,
	buildHandler,
	get_dcommitsHandler,
	get_dcommitsetHandler,
	get_dcommitHandler,
	get_dcallableHandler,
	get_workersHandler,
	get_nodesHandler,
	get_nodeHandler,
	get_worker_logsHandler,
}