import React from "react";
import interactionReducer from "../reducers/interactionReducer";

const initialState = {
  sidebarState: true
};

describe("interactionReducer", () => {
  it("should return initial state", () => {
    expect(interactionReducer(undefined, {})).toMatchObject(initialState);
  });

  it("should handle TOGGLE_SIDEBAR", () => {
    const TOGGLE_SIDEBAR = Object.assign(initialState, {
      sidebarState: true
    });

    expect(
      interactionReducer(undefined, {
        type: "TOGGLE_SIDEBAR",
        ...TOGGLE_SIDEBAR
      })
    ).toMatchObject(TOGGLE_SIDEBAR);
  });
});

describe("interactionReducer: TOGGLE_SIDEBAR", () => {});
