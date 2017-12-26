import React from "react";
import ConnectedEventDetailsComponent from "../components/eventDetailsComponent";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

const mockStore = configureStore();
let store, container;

const event = {
  id: 243426,
  type: "Concert",
  date: null,
  artist: [
    { displayName: "RLGDPPL", id: 23431 },
    { displayName: "Joelletron", id: 23432 },
    { displayName: "Windmill", id: 23433 }
  ],
  venue: "First Avenue",
  radius: 5,
  latlng: [44.988767, -93.254362],
  distance: 3
};

const initialState = {
  eventsReducer: {
    eventModalIsOpen: false,
    event: {
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
    }
  }
};

describe("<EventDetailsComponent />", () => {
  function handleEventDetailsVisibility() {
    return true;
  }

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(
      <ConnectedEventDetailsComponent store={store} />
    ).dive();
  });

  it("should match snapshot", () => {
    expect(toJson(container.props().event)).toMatchSnapshot();
  });
});
