import * as types from 'actions/types'
import Cookies from 'js-cookie'

const initialState = {
	token: Cookies.get('token'),
}

export default function user(user = initialState, action = {}) {
	switch (action.type) {
		case types.SET_TOKEN:
			return Object.assign({}, user, {
				token: action.token
			})
		default:
            return user
	}
}