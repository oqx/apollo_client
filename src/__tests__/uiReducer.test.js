import React from "react";
import uiReducer from "../reducers/uiReducer";

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
  event_modal_is_open: false
};

describe("uiReducer", () => {
  it("should return initial state", () => {
    expect(uiReducer(undefined, {})).toMatchObject(initialState);
  });

  it("should handle TOGGLE_SIDEBAR", () => {
    const obj = {
      ...initialState,
      sidebar_state: true
    };

    expect(
      uiReducer(undefined, {
        type: TOGGLE_SIDEBAR,
        sidebar_state: true
      })
    ).toMatchObject(obj);
  });

  it("should handle DISPATCH_NEW_ALERT", () => {
    const alert = {
      alert_title: "No Events",
      alert_message: `Try updating the "when" field, as there may be events on another day. Otherwise update the radius or location.`,
      alert_reload: false,
      alert_type: "notification"
    };
    const obj = {
      ...initialState,
      ...alert,
      alert_is_visible: true
    };
    expect(
      uiReducer(undefined, {
        type: DISPATCH_NEW_ALERT,
        ...alert
      })
    ).toMatchObject(obj);
  });

  it("should handle CLOSE_ALERT", () => {
    const obj = {
      ...initialState,
      alert_is_visible: false
    };

    expect(
      uiReducer(undefined, {
        type: CLOSE_ALERT,
        alert_is_visible: false
      })
    ).toMatchObject(obj);
  });

  it("should handle DISPATCH_NEW_EVENT_MODAL", () => {
    const obj = {
      ...initialState,
      event_modal_is_open: true
    };

    expect(
      uiReducer(undefined, {
        type: DISPATCH_NEW_EVENT_MODAL,
        event_modal_is_open: true
      })
    ).toMatchObject(obj);
  });

  it("should handle CLOSE_EVENT_MODAL", () => {
    const obj = {
      ...initialState,
      event_modal_is_open: false
    };

    expect(
      uiReducer(undefined, {
        type: CLOSE_EVENT_MODAL,
        event_modal_is_open: false
      })
    ).toMatchObject(obj);
  });
});
