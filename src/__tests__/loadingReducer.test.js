import React from "react";
import loading_reducer from "../reducers/loadingReducer";
import {
  REQUEST_LOCATION_PENDING,
  REQUEST_EVENTS_PENDING,
  REQUEST_LOCATION_COMPLETE,
  REQUEST_EVENTS_COMPLETE,
  REQUEST_RADIUS_UPDATE_PENDING,
  REQUEST_RADIUS_UPDATE_COMPLETE
} from "../actionTypes";

const initialState = {
  app_is_loading: false,
  radius_is_updating: false,
  fetching_location: false,
  fetching_data: false
};

describe("loading_reducer", () => {
  it("should return initial state", () => {
    expect(loading_reducer(undefined, {})).toMatchObject(initialState);
  });

  it("should handle REQUEST_LOCATION_PENDING", () => {
    const obj = {
      app_is_loading: true,
      fetching_location: true
    };
    expect(
      loading_reducer(undefined, {
        type: REQUEST_LOCATION_PENDING,
        obj
      })
    ).toMatchObject({ ...initialState, ...obj });
  });

  it("should handle REQUEST_LOCATION_COMPLETE", () => {
    const obj = {
      fetching_location: false
    };
    expect(
      loading_reducer(undefined, {
        type: REQUEST_LOCATION_COMPLETE,
        obj
      })
    ).toMatchObject({ ...initialState, ...obj });
  });

  it("should handle REQUEST_EVENTS_PENDING", () => {
    const obj = {
      fetching_data: true
    };
    expect(
      loading_reducer(undefined, {
        type: REQUEST_EVENTS_PENDING,
        obj
      })
    ).toMatchObject({ ...initialState, ...obj });
  });

  it("should handle REQUEST_EVENTS_COMPLETE", () => {
    const obj = {
      app_is_loading: false,
      fetching_data: false,
    };
    expect(
      loading_reducer(undefined, {
        type: REQUEST_EVENTS_COMPLETE,
        obj
      })
    ).toMatchObject({
      ...initialState,
      ...obj
    });
  });

  it("should handle REQUEST_RADIUS_UPDATE_PENDING", () => {
    const obj = {
      radius_is_updating: true
    };
    expect(
      loading_reducer(undefined, {
        type: REQUEST_RADIUS_UPDATE_PENDING,
        obj
      })
    ).toMatchObject({ ...initialState, ...obj });
  });

  it("should handle REQUEST_RADIUS_UPDATE_COMPLETE", () => {
    const obj = {
      radius_is_updating: false
    };
    expect(
      loading_reducer(undefined, {
        type: REQUEST_RADIUS_UPDATE_COMPLETE,
        obj
      })
    ).toMatchObject({ ...initialState, ...obj });
  });
});
