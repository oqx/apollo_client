import {
  TOGGLE_SIDEBAR,
  CLOSE_ALERT,
  CLOSE_EVENT_MODAL,
  DISPATCH_NEW_ALERT,
  DISPATCH_NEW_EVENT_MODAL
} from "../actionTypes";

const initialState = {
  sidebar_state: true,
  alert_title: "Default Error",
  alert_message: "Default Error Message",
  alert_type: "error",
  alert_reload: false,
  alert_is_visible: false,
  event_modal_is_open: false,
};

function UIReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebar_state: action.sidebar_state
      };

    case CLOSE_ALERT:
      return {
        ...state,
        alert_is_visible: false
      };

    case DISPATCH_NEW_ALERT:
      return {
        ...state,
        alert_title: action.alert_title,
        alert_message: action.alert_message,
        alert_type: action.alert_type,
        alert_reload: action.alert_reload,
        alert_is_visible: true
      };

    case DISPATCH_NEW_EVENT_MODAL:
      return {
        ...state,
        event_modal_is_open: true
      };

    case CLOSE_EVENT_MODAL:
      return {
        ...state,
        event_modal_is_open: false,
      };

    default:
      return state;
  }
}

export default UIReducer;
