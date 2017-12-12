import { Map, List } from 'immutable'

const initialState = Map({
	displayLoader: false,
	fetchingLocation: false,
	fetchingData: false,
	mappingData: false,
	userCoordinates: List.of(44.964630, -93.276932),
	events: List(),
	radius: 5,
	zoom: 13,
	radiusIsUpdating: false,
	dateRange: 'Today'
})

function eventsReducer(state = initialState, action) {

	switch(action.type) {

		case 'UPDATE_DATE_FILTER':
			return state.merge({
				dateRange: action.range
			})

		case 'MAP_EVENTS_FULFILLED': {
			return state.merge({
				displayLoader: false,
				mappingData: false,
				userCoordinates: List(action.userCoordinates),
				events: List(action.events),
				radiusIsUpdating: false,
				radius: action.radius,
				zoom: action.zoom
			})
		}

    default:
      return state
	}
}

export default eventsReducer
