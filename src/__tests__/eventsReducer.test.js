import React from "react";
import { Map, List, is } from "immutable";
import eventsReducer from "../reducers/eventsReducer";

const initialState = Map({
  dateRange: "Today"
});

describe("eventsReducer: UPDATE_DATE_FILTER", () => {
  it("default value for date range", () => {
    expect(
      is(eventsReducer(undefined, { type: "unexpected" }), initialState)
    ).toEqual(true);
  });
});

const UPDATE_DATE_FILTER = Map({
  dateRange: undefined
});

describe("eventsReducer: UPDATE_DATE_FILTER", () => {
  it("should update date ranger", () => {
    expect(
      is(
        eventsReducer(undefined, { type: "UPDATE_DATE_FILTER" }),
        UPDATE_DATE_FILTER
      )
    ).toEqual(true);
  });
});
