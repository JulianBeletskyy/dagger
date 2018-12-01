import * as types from 'actions/types'

const initialState = {
	location: '/',
	alert: {
		message: '',
		level: 'success',
		delay: 2000
	},
	modal: {
		open: false,
		title: '',
		component: null
	},
}

export default function ui(ui = initialState, action = {}) {
	switch (action.type) {
		case types.SET_LOCATION:
			return Object.assign({}, ui, {
				location: action.location
			})
		case types.SET_ALERT:
			return Object.assign({}, ui, {
				alert: action.data
			})
		case types.TOGGLE_MODAL:
			return Object.assign({}, ui, {
				modal: action.data
			})
		case types.CLOSE_MODAL:
			return Object.assign({}, ui, {
				modal: {...ui.modal, open: false}
			})
		default:
            return ui;
	}
}