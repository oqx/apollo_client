import React from "react";
import dataReducer from "../reducers/dataReducer";

import {
  DISPATCH_SELECTED_DATE_RANGE,
  DISPATCH_NEW_EVENTS,
  DISPATCH_SELECTED_RADIUS,
  DISPATCH_USER_COORDINATES,
  DISPATCH_MAP_ZOOM,
  DISPATCH_NEW_EVENT_MODAL,
  CLOSE_EVENT_MODAL
} from "../actionTypes";

const nullEvent = {
  venue: null,
  date: null,
  distance: null,
  artist: [
    {
      displayName: null,
      id: null
    }
  ],
  latlng: [null, null],
  id: null
};

const initialState = {
  date_range: "Today",
  user_coordinates: [44.96463, -93.276932],
  events: [],
  event: nullEvent,
  radius: 5,
  zoom: 13
};

describe("dataReducer", () => {
  it("should return initial state", () => {
    expect(dataReducer(undefined, {})).toMatchObject(initialState);
  });

  it(`should handle ${DISPATCH_SELECTED_DATE_RANGE}`, () => {
    const obj = {
      date_range: "Tomorrow"
    };

    expect(
      dataReducer(undefined, {
        type: DISPATCH_SELECTED_DATE_RANGE,
        ...obj
      })
    ).toMatchObject({...initialState, ...obj});
  });

  it(`should handle ${DISPATCH_NEW_EVENTS}`, () => {
    const obj = {
      events: [
        {
          venue: "First Avenue",
          date: "12/12/2018",
          distance: 4,
          artist: [
            {
              displayName: "RLGDPPL",
              id: 23423
            }
          ],
          latlng: [97.34545, -43.4354545],
          id: 234656
        }
      ],
    };

    expect(
      dataReducer(undefined, {
        type: DISPATCH_NEW_EVENTS,
        ...obj
      })
    ).toMatchObject({...initialState, ...obj});
  });

  it(`should handle ${DISPATCH_SELECTED_RADIUS}`, () => {
    const obj = {
      radius: 10
    };

    expect(
      dataReducer(undefined, {
        type: DISPATCH_SELECTED_RADIUS,
        ...obj
      })
    ).toMatchObject({...initialState, ...obj});
  });

  it(`should handle ${DISPATCH_USER_COORDINATES}`, () => {
    const obj = {
      user_coordinates: [12.96463, -22.276932]
    };

    expect(
      dataReducer(undefined, {
        type: DISPATCH_USER_COORDINATES,
        ...obj
      })
    ).toMatchObject({...initialState, ...obj});
  });

  it(`should handle ${DISPATCH_MAP_ZOOM}`, () => {
    const obj = {
      zoom: 8
    };

    expect(
      dataReducer(undefined, {
        type: DISPATCH_MAP_ZOOM,
        ...obj
      })
    ).toMatchObject({...initialState, ...obj});
  });

  it(`should handle ${DISPATCH_NEW_EVENT_MODAL}`, () => {
    const obj = {
      venue: "First Avenue",
      date: "12/12/2018",
      distance: 4,
      artist: [
        {
          displayName: "RLGDPPL",
          id: 23423
        }
      ],
      latlng: [97.34545, -43.4354545],
      id: 234656
    };
    expect(
      dataReducer(undefined, {
        type: DISPATCH_NEW_EVENT_MODAL,
        event: obj
      })
    ).toMatchObject({...initialState, event: obj});
  });

  it(`should handle ${CLOSE_EVENT_MODAL}`, () => {
    const obj = {
      zoom: 8
    };

    expect(
      dataReducer(undefined, {
        type: CLOSE_EVENT_MODAL,
        event: nullEvent
      })
    ).toMatchObject({...initialState });
  });

});
