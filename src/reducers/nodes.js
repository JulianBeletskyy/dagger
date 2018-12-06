import * as types from 'actions/types'

const initialState = {
	list: [],
	node: {},
}

export default function nodes(nodes = initialState, action = {}) {
	switch (action.type) {
		case types.SET_NODES:
			return Object.assign({}, nodes, {
				list: action.data
			})
		case types.SET_NODE:
			return Object.assign({}, nodes, {
				node: action.data
			})
		default:
            return nodes
	}
}