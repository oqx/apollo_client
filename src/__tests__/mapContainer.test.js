import React from "react";
import ReactDOM from "react-dom";
import { Map, List } from "immutable";
import { shallow } from "enzyme";
import ConnectedMapContainer, {
  MapContainer
} from "../containers/mapContainer";
import { mocks } from "../mockResults";
import configureStore from "redux-mock-store";

const mockStore = configureStore();
let store, container;

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

describe("<MapContainer />", () => {
  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<ConnectedMapContainer store={store} />);
  });

  it("renders successfully", () => {
    expect(container.length).toEqual(1);
  });
});
