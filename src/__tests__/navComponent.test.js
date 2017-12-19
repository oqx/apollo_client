import React from "react";
import ConnectedNav, { Nav } from "../components/navComponent";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import configureStore from "redux-mock-store";
import { Map } from "immutable";

const mockStore = configureStore();
let store, container, mountedContainer;

const initialState = Map({
  interactionReducer: Map({
    sidebarState: true
  })
});

let state = {
  btnClick: false
};

const spy = jest.fn();

const handleClickStub = () => {
  state.btnClick = true;
  spy();
};

describe("<Nav />", () => {
  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<ConnectedNav store={store} />).dive();
  });

  it("should render successfully", () => {
    expect(container.length).toEqual(1);
  });

  it("should render correctly", () => {
    expect(toJson(container)).toMatchSnapshot();
  });
});
