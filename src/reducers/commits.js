import * as types from 'actions/types'

const initialState = {
	list: [],
	commit: {},
}

export default function commits(commits = initialState, action = {}) {
	switch (action.type) {
		case types.SET_COMMITS_LIST:
			return Object.assign({}, commits, {
				list: action.list
			})
		case types.SET_COMMIT:
			return Object.assign({}, commits, {
				commit: action.data
			})
		default:
            return commits
	}
}