import * as types from 'actions/types'

const initialState = {
    callable: {},
}

export default function callables(callables = initialState, action = {}) {
    switch (action.type) {
        case types.SET_CALLABLE:
            return Object.assign({}, callables, {
                callable: action.data
            })
		default:
            return callables
	}
}
