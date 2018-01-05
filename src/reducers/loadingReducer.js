import {
  REQUEST_LOCATION_PENDING,
  REQUEST_EVENTS_PENDING,
  REQUEST_LOCATION_COMPLETE,
  REQUEST_EVENTS_COMPLETE,
  REQUEST_RADIUS_UPDATE_PENDING,
  REQUEST_RADIUS_UPDATE_COMPLETE,
  DISPATCH_NEW_ALERT
} from "../actionTypes";

const initialState = {
  app_is_loading: false,
  radius_is_updating: false,
  fetching_location: false,
  fetching_data: false,
  status: false,
  status_message: null
};

function loadingReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_LOCATION_PENDING:
      return {
        ...state,
        app_is_loading: true,
        fetching_location: true
      };

    case REQUEST_LOCATION_COMPLETE:
      return {
        ...state,
        fetching_location: false
      };

    case REQUEST_EVENTS_PENDING:
      return {
        ...state,
        fetching_data: true
      };

    case REQUEST_RADIUS_UPDATE_PENDING:
      return {
        ...state,
        radius_is_updating: true
      };

    case REQUEST_RADIUS_UPDATE_COMPLETE:
      return {
        ...state,
        radius_is_updating: false
      };

    case REQUEST_EVENTS_COMPLETE:
      return {
        ...state,
        app_is_loading: false,
        fetching_data: false
      };

    case DISPATCH_NEW_ALERT:
      return {
        ...state,
        app_is_loading: false,
        fetching_location: false,
        fetching_data: false
      };
      
    default:
      return state;
  }
}

export default loadingReducer;
