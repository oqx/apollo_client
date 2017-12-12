import { Map } from 'immutable'

const initialState = Map({
	sidebarState: true
})

function interactionReducer(state = initialState, action) {

	switch(action.type) {
		case 'TOGGLE_SIDEBAR':
			return state.merge({
				sidebarState: action.sidebarState
			});

		default:
			return state
	}
}

export default interactionReducer
