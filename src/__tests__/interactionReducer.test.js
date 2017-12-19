import React from "react";
import { Map, List, is } from "immutable";
import interactionReducer from "../reducers/interactionReducer";

const initialState = Map({
  sidebarState: true
});

describe("interactionReducer: default", () => {
  it("has a default state", () => {
    expect(
      is(interactionReducer(undefined, { type: "unexpected" }), initialState)
    ).toEqual(true);
  });
});

const TOGGLE_SIDEBAR = initialState.merge({
  sidebarState: false
});

describe("interactionReducer: TOGGLE_SIDEBAR", () => {
  it("toggles sidebar state", () => {
    expect(
      is(
        interactionReducer(undefined, { type: "TOGGLE_SIDEBAR" }),
        TOGGLE_SIDEBAR
      )
    ).toEqual(false);
  });
});
