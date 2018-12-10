import * as types from 'actions/types'

const initialState = {
	list: [],
	logs: '',
    worker: {},
}

export default function workers(workers = initialState, action = {}) {
	switch (action.type) {
		case types.SET_WORKERS:
			return Object.assign({}, workers, {
				list: action.data
			})
		case types.SET_WORKER_LOGS:
			return Object.assign({}, workers, {
				logs: action.data
			})
		case types.SET_WORKER:
            return Object.assign({}, workers, {
                worker: action.data
            })
		default:
            return workers
	}
}