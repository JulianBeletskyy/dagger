import * as types from 'actions/types'

const initialState = {
	list: [],
	buildCommit: '',
	commitSet: {},
}

export default function commitsets(commitsets = initialState, action = {}) {
	switch (action.type) {
		case types.SET_COMMITSET_LIST:
			return Object.assign({}, commitsets, {
				list: action.list
			})
		case types.SET_COMMITSET:
			return Object.assign({}, commitsets, {
				commitSet: action.data,
			})
		case types.SET_BUILD_COMMIT:
			return Object.assign({}, commitsets, {
				buildCommit: action.data
			})
		default:
            return commitsets
	}
}