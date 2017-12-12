import { Map } from 'immutable'

const initialState = Map({
	appIsLoading: false,
	radiusIsUpdating: false,
	fetchingLocation: false,
	fetchingData: false,
	mappingData: false
})

function appStatusReducer(state = initialState, action) {

	switch(action.type) {

		case 'REQUEST_LOCATION_PENDING':
			return state.merge({
				appIsLoading: true,
				fetchingLocation: true
			})

		case 'REQUEST_EVENTS_PENDING':
			return state.merge({
				fetchingLocation: false,
				fetchingData: true
			})

		case 'RADIUS_UPDATE_PENDING':
			return state.merge({
				radiusIsUpdating: true
			})

		case 'MAP_EVENTS_PENDING':
			return state.merge({
				fetchingData: false,
				mappingData: true
			})

		case 'MAP_EVENTS_FULFILLED':
			return state.merge({
				appIsLoading: false,
				mappingData: false,
				fetchingData: false,
				radiusIsUpdating: false
			})

		case 'NO_EVENT_RESULTS':
			return state.merge({
				mappingData: false,
				fetchingData: false
			})

		default:
			return state;
	}
}

export default appStatusReducer
