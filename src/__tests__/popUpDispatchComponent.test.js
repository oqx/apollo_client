import React from "react";
import PopUpDispatchComponent from "../components/popUpDispatchComponent";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import { completeShow } from "../mockResults";

let store, container, mountedContainer;

const spy = jest.fn();

const state = {
  btnClick: false
};

const handleClickStub = () => {
  state.btnClick = true;
  spy();
};

describe("<PopUpDispatchComponent />", () => {
  beforeEach(() => {
    container = shallow(
      <PopUpDispatchComponent
        event={completeShow}
        getPopUpStatusAndEvent={handleClickStub}
      />
    );
    mountedContainer = mount(
      <PopUpDispatchComponent
        event={completeShow}
        getPopUpStatusAndEvent={handleClickStub}
      />
    );
  });

  it("should render successfully", () => {
    expect(container.length).toEqual(1);
  });

  it("should render correctly", () => {
    expect(toJson(container)).toMatchSnapshot();
  });

  it("should trigger a function when componentDidMount", () => {
    expect(spy).toHaveBeenCalledTimes(2);
    expect(state.btnClick).toBe(true);
  });

  afterEach(() => {
    spy.mockClear();
  });
});
