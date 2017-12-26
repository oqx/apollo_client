import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import ConnectedMapContainer, {
  MapContainer
} from "../containers/mapContainer";
import { mocks, completeShow } from "../mockResults";
import configureStore from "redux-mock-store";

const mockStore = configureStore();
let store, container;

const initialState = {
  appStatusReducer: {
    appIsLoading: false,
    events: [completeShow],
    userCoordinates: [44.96463, -93.276932],
    zoom: 13
  },
  interactionReducer: {
    sidebarState: true
  },
  eventsReducer: {
    dateRange: "Today"
  }
};

describe("<MapContainer />", () => {
  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<ConnectedMapContainer store={store} />);
  });

  it("renders successfully", () => {
    expect(container.length).toEqual(1);
  });
});
