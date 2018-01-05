import {
  DISPATCH_SELECTED_DATE_RANGE,
  DISPATCH_NEW_EVENTS,
  DISPATCH_SELECTED_RADIUS,
  DISPATCH_USER_COORDINATES,
  DISPATCH_MAP_ZOOM,
  DISPATCH_NEW_EVENT_MODAL,
  CLOSE_EVENT_MODAL
} from "../actionTypes";

const nullEvent = {
  venue: null,
  date: null,
  distance: null,
  artist: [
    {
      displayName: null,
      id: null
    }
  ],
  latlng: [null, null],
  id: null
};

const initialState = {
  date_range: "Today",
  user_coordinates: [44.96463, -93.276932],
  events: [],
  event: nullEvent,
  radius: 5,
  zoom: 13
};

function dataReducer(state = initialState, action) {
  switch (action.type) {
    case DISPATCH_SELECTED_DATE_RANGE:
      return {
        ...state,
        date_range: action.date_range
      };

    case DISPATCH_NEW_EVENTS:
      return {
        ...state,
        events: action.events
      };

    case DISPATCH_SELECTED_RADIUS:
      return {
        ...state,
        radius: action.radius
      };

    case DISPATCH_USER_COORDINATES:
      return {
        ...state,
        user_coordinates: action.user_coordinates
      };

    case DISPATCH_MAP_ZOOM:
      return {
        ...state,
        zoom: action.zoom
      };

    case DISPATCH_NEW_EVENT_MODAL:
      return {
        ...state,
        event: action.event
      };

    case CLOSE_EVENT_MODAL:
      return {
        ...state,
        event: nullEvent
      };
    default:
      return state;
  }
}

export default dataReducer;
