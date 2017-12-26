const initialState = {
  appIsLoading: false,
  radiusIsUpdating: false,
  fetchingLocation: false,
  fetchingData: false,
  userCoordinates: [44.96463, -93.276932],
  events: [],
  radius: 5,
  zoom: 13
};

function appStatusReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_LOCATION_PENDING":
      return {
        ...state,
        appIsLoading: true,
        fetchingLocation: true
      };

    case "REQUEST_EVENTS_PENDING":
      return {
        ...state,
        fetchingLocation: false,
        fetchingData: true
      };

    case "RADIUS_UPDATE_PENDING":
      return {
        ...state,
        radiusIsUpdating: true
      };

    case "NO_EVENT_RESULTS":
      return {
        ...state,
        fetchingData: false
      };

    case "MAP_EVENTS_FULFILLED":
      return {
        ...state,
        appIsLoading: false,
        events: action.events,
        fetchingData: false,
        radius: action.radius,
        radiusIsUpdating: false,
        userCoordinates: action.userCoordinates,
        zoom: action.zoom
      };

    default:
      return state;
  }
}

export default appStatusReducer;
