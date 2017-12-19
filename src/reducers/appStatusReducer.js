import { Map, List } from "immutable";

const initialState = Map({
  appIsLoading: false,
  radiusIsUpdating: false,
  fetchingLocation: false,
  fetchingData: false,
  userCoordinates: List.of(44.96463, -93.276932),
  events: List(),
  radius: 5,
  zoom: 13
});

function appStatusReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_LOCATION_PENDING":
      return state.merge({
        appIsLoading: true,
        fetchingLocation: true
      });

    case "REQUEST_EVENTS_PENDING":
      return state.merge({
        fetchingLocation: false,
        fetchingData: true
      });

    case "RADIUS_UPDATE_PENDING":
      return state.merge({
        radiusIsUpdating: true
      });

    case "NO_EVENT_RESULTS":
      return state.merge({
        fetchingData: false
      });

    case "MAP_EVENTS_FULFILLED": {
      return state.merge({
        appIsLoading: false,
        events: List(action.events),
        fetchingData: false,
        radius: action.radius,
        radiusIsUpdating: false,
        userCoordinates: List(action.userCoordinates),
        zoom: action.zoom
      });
    }

    default:
      return state;
  }
}

export default appStatusReducer;
