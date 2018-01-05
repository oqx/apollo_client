jest.unmock('redux-mock-store')

import React from "react";
import { shallow } from "enzyme";
import MapContainer from "../containers/mapContainer";
import { mocks, completeShow } from "../mockResults";
import { configureStore } from "redux-mock-store";

const mockStore = configureStore();
let store, container;

const initialState = {
  loading_reducer: {
    app_is_loading: false
  },
  ui_reducer: {
    sidebar_state: true
  },
  data_reducer: {
    user_coordinates: [44.96463, -93.276932],
    zoom: 13,
    events: [completeShow],
    date_range: "Today"
  }
};

describe("<MapContainer />", () => {
  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<MapContainer store={store} />).dive();
  });

  it("renders successfully", () => {
    expect(container.length).toEqual(1);
  });
});
