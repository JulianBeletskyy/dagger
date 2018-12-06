import * as types from 'actions/types'

const initialState = {
	list: [],
}

export default function workers(workers = initialState, action = {}) {
	switch (action.type) {
		case types.SET_WORKERS:
			return Object.assign({}, workers, {
				list: action.data
			})
		
		default:
            return workers
	}
}