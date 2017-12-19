import React from "react";
import { Map, List, is } from "immutable";
import appStatusReducer from "../reducers/appStatusReducer";

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

describe("appStatusReducer: default", () => {
  it("has a default state", () => {
    expect(
      is(appStatusReducer(undefined, { type: "unexpected" }), initialState)
    ).toEqual(true);
  });
});

const REQUEST_LOCATION_PENDING = initialState.merge({
  appIsLoading: true,
  fetchingLocation: true
});

describe("appStatusReducer: REQUEST_LOCATION_PENDING", () => {
  it("sets fetchingLocation to true and sets appIsLoading to true", () => {
    expect(
      is(
        appStatusReducer(undefined, { type: "REQUEST_LOCATION_PENDING" }),
        REQUEST_LOCATION_PENDING
      )
    ).toEqual(true);
  });
});

const REQUEST_EVENTS_PENDING = initialState.merge({
  fetchingLocation: false,
  fetchingData: true
});

describe("appStatusReducer: REQUEST_EVENTS_PENDING", () => {
  it("sets fetchingLocation to false, sets fetchingData to true", () => {
    expect(
      is(
        appStatusReducer(undefined, { type: "REQUEST_EVENTS_PENDING" }),
        REQUEST_EVENTS_PENDING
      )
    ).toEqual(true);
  });
});

const RADIUS_UPDATE_PENDING = initialState.merge({
  radiusIsUpdating: true
});

describe("appStatusReducer: RADIUS_UPDATE_PENDING", () => {
  it("sets fetchingLocation to false, sets fetchingData to true", () => {
    expect(
      is(
        appStatusReducer(undefined, { type: "RADIUS_UPDATE_PENDING" }),
        RADIUS_UPDATE_PENDING
      )
    ).toEqual(true);
  });
});

const NO_EVENT_RESULTS = initialState.merge({
  fetchingData: false
});

describe("appStatusReducer: NO_EVENT_RESULTS", () => {
  it("sets fetchingLocation to false, sets fetchingData to true", () => {
    expect(
      is(
        appStatusReducer(undefined, { type: "NO_EVENT_RESULTS" }),
        NO_EVENT_RESULTS
      )
    ).toEqual(true);
  });
});

const MAP_EVENTS_FULFILLED = initialState.merge({
  appIsLoading: false,
  events: List(),
  fetchingData: false,
  radius: undefined,
  radiusIsUpdating: false,
  userCoordinates: List(),
  zoom: undefined
});

describe("appStatusReducer: MAP_EVENTS_FULFILLED", () => {
  it("sets fetchingLocation to false, sets fetchingData to true", () => {
    expect(
      is(
        appStatusReducer(undefined, { type: "MAP_EVENTS_FULFILLED" }),
        MAP_EVENTS_FULFILLED
      )
    ).toEqual(true);
  });
});
