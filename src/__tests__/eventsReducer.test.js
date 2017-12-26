import React from "react";
import eventsReducer from "../reducers/eventsReducer";

const initialState = {
  dateRange: "Today"
};

describe("eventsReducer", () => {
  it("should return initial state", () => {
    expect(eventsReducer(undefined, {})).toMatchObject(initialState);
  });

  it("should handle UPDATE_DATE_FILTER", () => {
    const UPDATE_DATE_FILTER = {
      dateRange: undefined
    };
    expect(
      eventsReducer(undefined, {
        type: "UPDATE_DATE_FILTER",
        ...UPDATE_DATE_FILTER
      })
    ).toMatchObject(UPDATE_DATE_FILTER);
  });
});
