import React from "react";
import appStatusReducer from "../reducers/appStatusReducer";

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

describe("appStatusReducer", () => {
  it("should return initial state", () => {
    expect(appStatusReducer(undefined, {})).toMatchObject(initialState);
  });

  it("should handle REQUEST_LOCATION_PENDING", () => {
    const REQUEST_LOCATION_PENDING = {
      appIsLoading: true,
      fetchingLocation: true
    };
    expect(
      appStatusReducer(undefined, {
        type: "REQUEST_LOCATION_PENDING",
        REQUEST_LOCATION_PENDING
      })
    ).toMatchObject({ ...initialState, ...REQUEST_LOCATION_PENDING });
  });

  it("should handle REQUEST_EVENTS_PENDING", () => {
    const REQUEST_EVENTS_PENDING = {
      fetchingLocation: false,
      fetchingData: true
    };
    expect(
      appStatusReducer(undefined, {
        type: "REQUEST_EVENTS_PENDING",
        REQUEST_EVENTS_PENDING
      })
    ).toMatchObject({ ...initialState, ...REQUEST_EVENTS_PENDING });
  });

  it("should handle RADIUS_UPDATE_PENDING", () => {
    const RADIUS_UPDATE_PENDING = {
      radiusIsUpdating: true
    };
    expect(
      appStatusReducer(undefined, {
        type: "RADIUS_UPDATE_PENDING",
        RADIUS_UPDATE_PENDING
      })
    ).toMatchObject({ ...initialState, ...RADIUS_UPDATE_PENDING });
  });

  it("should handle NO_EVENT_RESULTS", () => {
    const NO_EVENT_RESULTS = {
      fetchingData: false
    };
    expect(
      appStatusReducer(undefined, { type: "NO_EVENT_RESULTS" }),
      NO_EVENT_RESULTS
    ).toMatchObject({ ...initialState, ...NO_EVENT_RESULTS });
  });

  it("should handle MAP_EVENTS_FULFILLED", () => {
    const MAP_EVENTS_FULFILLED = {
      events: [],
      radius: 10,
      userCoordinates: [25, 25],
      zoom: 7
    };
    expect(
      appStatusReducer(undefined, {
        type: "MAP_EVENTS_FULFILLED",
        ...MAP_EVENTS_FULFILLED
      })
    ).toMatchObject({
      ...initialState,
      ...MAP_EVENTS_FULFILLED,
      appIsLoading: false,
      fetchingData: false,
      radiusIsUpdating: false
    });
  });
});
