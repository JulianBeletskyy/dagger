import * as types from './types'

export const setClient = client => dispatch => {
	dispatch({
		type: types.SET_CLIENT,
		client,
	})
	return Promise.resolve(true)
}

export const setReady = value => {
	return {
		type: types.SET_READY,
		value,
	}
}

export const setStartPing = (id, date) =>
	({
		type: types.SET_START_PING,
		id,
		date,
	})	

// export const setPing = ping =>
// 	({
// 		type: types.SET_PING,
// 		ping,
// 	})

export const setConnection = value =>
	({
		type: types.SET_CONNECTION,
		value,
	})