import {
  TOGGLE_SIDEBAR,
  DISPATCH_NEW_ALERT,
  CLOSE_ALERT
} from "../actionTypes";

export const $uiSetSidebarState = sidebar_state => {
  return {
    type: TOGGLE_SIDEBAR,
    sidebar_state
  };
};

export const $uiNoEventsAlert = () => {
  return {
    type: DISPATCH_NEW_ALERT,
    alert_title: "No Events",
    alert_message: `Try updating the "when" field, as there may be events on another day. Otherwise update the radius or location.`,
    alert_reload: false,
    alert_type: "notification"
  };
};

export const $uiApiErrorAlert = (api_name, error) => {
  return {
    type: DISPATCH_NEW_ALERT,
    alert_title: api_name,
    alert_message: error,
    alert_reload: true,
    alert_type: "error"
  };
};

export const $uiCloseAlert = () => ({
  type: CLOSE_ALERT
});
