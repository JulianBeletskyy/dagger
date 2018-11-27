import * as types from 'actions/types'

const initialState = {
	list: [],
}

export default function commits(commits = initialState, action = {}) {
	switch (action.type) {
		case types.SET_COMMITS_LIST:
			return Object.assign({}, commits, {
				list: action.list
			})
		default:
            return commits
	}
}